import { hashedpassword } from '$lib';
import { and, eq } from 'drizzle-orm';
import { useDrizzle } from '../../db/dbinit';
import { users } from '../../db/schema';
import type { Actions } from './$types';
import { generateToken } from '$lib/jwtutil';
import { isRedirect, redirect } from '@sveltejs/kit';

export const actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const email = String(data.get('email'));
    const passwd = String(data.get('password'));

    try {
      const passhash = await hashedpassword(passwd);
      const sqlite = useDrizzle(event);
      const [loggeduser] = await sqlite
        .select({ id: users.id, user: users.username, email: users.email })
        .from(users)
        .where(and(eq(users.email, email), eq(users.password, passhash)))

      if (loggeduser) {
        const token = await generateToken(loggeduser.id)
        event.cookies.set('jwt-token', token, {
          path: '/',
          httpOnly: true,    // More secure, not accessible via JS
          sameSite: 'lax',   // CSRF protection
          maxAge: 60 * 5
        })
        // console.log(token)
        throw redirect(303, loggeduser.user)
      } else {
        return { error: 'wrong credentials' }
      }
    } catch (e) {
      if (isRedirect(e)) {
        throw redirect(e.status, e.location)
      } else {
        return { error: JSON.stringify(e) }
      }
    }
  }
} satisfies Actions;



// console.log(env.PASSWORD)
