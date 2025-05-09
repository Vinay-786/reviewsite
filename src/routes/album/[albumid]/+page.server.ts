import type { Actions, PageServerLoad } from "./$types";
import { isLoggedin } from "$lib";
import { useDrizzle } from "../../../db/dbinit";
import { reviews } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { error } from "@sveltejs/kit";


export const load: PageServerLoad = async (event) => {
  const sqlite = useDrizzle(event)

  event.depends(`api:reviews:${event.params.albumid}`);
  const reviewsbyalbum = await sqlite.select().from(reviews).where(eq(reviews.albumid, event.params.albumid))
  return { albumreviews: reviewsbyalbum }
}

export const actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const review = String(data.get('review'));
    // console.log("review: ", review)

    const res = await isLoggedin(event)
    if (res.status === 200) {
      console.log('Authenticated', res.userId)
      const sqlite = useDrizzle(event)
      const [insertreview] = await sqlite.
        insert(reviews)
        .values({
          content: review,
          reviewer: String(res.userId),
          albumid: event.params.albumid
        })
        .returning({ id: reviews.id })
      // console.log(insertreview.id)
      return { success: true }
    } else {
      // console.log('Unauthenticated', res.message)
      return error(401, 'error')
    }


  }
} satisfies Actions
