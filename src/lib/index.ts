// place files you want to import through the `$lib` alias in this folder.
import { error, type RequestEvent } from "@sveltejs/kit";
import { jwtVerify } from "jose";
import crypto, { createSecretKey } from "node:crypto"
import { env } from "$env/dynamic/private";

export const hashedpassword = async (password: string) => {
  const encodetext = new TextEncoder().encode(password);
  const mydigest = await crypto.subtle.digest({ name: 'SHA-256' }, encodetext);
  const hashedpass = [...new Uint8Array(mydigest)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashedpass;
};


export const isLoggedin = async (e: RequestEvent) => {
  try {
    const token = e.cookies.get('jwt-token') ?? '';

    if (!token) {
      throw error(401, 'Not authenticated');
    }

    const secretKey = createSecretKey(env.secretKey, 'utf-8');
    const { payload } = await jwtVerify(token, secretKey, {
      issuer: env.JWT_ISSUER,
      audience: env.JWT_AUDIENCE,
    });

    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < currentTime) {
      throw error(401, 'Not authenticated');
    }

    return {
      status: 200,
      userId: payload.id,
      message: 'Authenticated',
    };
  } catch (err) {
    //@ts-ignore
    console.error(`Authentication failed: ${err}`);
    return {
      status: 403,
      message: 'Invalid token',
    };
  }
};
