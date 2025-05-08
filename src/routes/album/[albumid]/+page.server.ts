import { jwtVerify } from "jose";
import type { Actions, PageServerLoad } from "./$types";
import { error } from '@sveltejs/kit';
import { env } from "$env/dynamic/private";
import { createSecretKey } from "crypto";
import { useDrizzle } from "../../../db/dbinit";
import { reviews } from "../../../db/schema";

export const load: PageServerLoad = async ({ params }) => {
  const [res, coverartRes] = await Promise.all([
    fetch(`https://musicbrainz.org/ws/2/release-group/?query=rgid:${params.albumid}&fmt=json`,
      {
        headers: {
          "User-Agent": "Albumreview (itsvinay.in@gmail.com)"
        }
      }).then(
        (res) => res.json()
      ),
    fetch(`https://coverartarchive.org/release-group/${params.albumid}/front-250`)
  ]);

  const coverartUrl = coverartRes.ok ? coverartRes.url : null;

  return {
    //@ts-ignore
    album: res['release-groups'] ?? [],
    albumid: params.albumid,
    coverarturl: coverartUrl
  };
};

export const actions = {
  submitreview: async ({ request, platform, cookies }) => {
    const data = await request.formData();
    const token = cookies.get('jwt-token') ?? ''
    if (!token) {
      return { message: 'not logged in' }
    }

    const secretKey = createSecretKey(env.secretKey, 'utf-8')
    const { payload } = await jwtVerify(token, secretKey, {
      issuer: env.JWT_ISSUER, // issuer
      audience: env.JWT_AUDIENCE, // audience
    });

    const review = String(data.get('review'));
    const userid = String(payload.id)


    const sqlite = useDrizzle(platform?.env.DB!)
    const [insertreview] = await sqlite.insert(reviews).values({ content: review, reviewer: userid }).returning({ id: reviews.id })

    console.log("review: ", review)
  }
} satisfies Actions
