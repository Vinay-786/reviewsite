// place files you want to import through the `$lib` alias in this folder.
import { error, isRedirect, redirect, type RequestEvent } from '@sveltejs/kit';
import { jwtVerify } from 'jose';
import crypto from 'node:crypto';
import { env } from '$env/dynamic/private';
import { generateToken } from './jwtutil';

export const hashedpassword = async (password: string) => {
	const encodetext = new TextEncoder().encode(password);
	const mydigest = await crypto.subtle.digest({ name: 'SHA-256' }, encodetext);
	const hashedpass = [...new Uint8Array(mydigest)]
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
	return hashedpass;
};

const secretKey = new TextEncoder().encode(env.secretKey);
const secretKeyRefresh = new TextEncoder().encode(env.secretKeyRefresh);

export const isLoggedin = async (e: RequestEvent) => {
	try {
		try {
			const token = e.cookies.get('jwt-auth-token');
			if (!token) throw error(401, { message: 'tokennotFound' });

			const { payload } = await jwtVerify(token, secretKey, {
				issuer: env.JWT_ISSUER,
				audience: env.JWT_AUDIENCE
			});

			// Token is valid, return success
			return {
				status: 200,
				userId: String(payload.id),
				user: String(payload.user),
				message: 'Authenticated'
			};
		} catch (tokenErr) {
			// Token verification failed - could be expired or invalid
			// Try refreshing if we have a refresh token
			// console.warn('Access token verification failed, attempting refresh...', tokenErr);
			if (tokenErr instanceof Error && tokenErr.name === 'tokennotFound') {
				throw redirect(402, '/signin');
			}

			const refresh = e.cookies.get('jwt-ref-token');
			if (!refresh) throw error(401, 'refreshTokenNotFound');

			const { payload: refreshPayload } = await jwtVerify(refresh, secretKeyRefresh, {
				issuer: env.JWT_ISSUER,
				audience: env.JWT_AUDIENCE
			});

			const newToken = await generateToken(String(refreshPayload.id), String(refreshPayload.user));
			e.cookies.set('jwt-auth-token', newToken, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				maxAge: 60 * 15,
				secure: process.env.NODE_ENV === 'production'
			});

			return {
				status: 200,
				userId: String(refreshPayload.id),
				user: String(refreshPayload.user),
				message: 'Authenticated (Refreshed)'
			};
		}
	} catch (err) {
		//@ts-ignore
		console.error(`Authentication failed: ${err}`);

		// Clear cookies on authentication failure
		// e.cookies.delete('authtoken', { path: '/' });
		// e.cookies.delete('authrtoken', { path: '/' });

		return {
			status: 403,
			//@ts-ignore
			message: err.message ?? 'Invalid token'
		};
	}
};
