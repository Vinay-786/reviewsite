// src/routes/api/refresh-token/+server.ts
import { json } from '@sveltejs/kit';
import { jwtVerify } from 'jose';
import type { RequestHandler } from './$types';
import { createSecretKey } from 'node:crypto';
import { env } from '$env/dynamic/private';
import { refreshToken } from '$lib/jwtutil';

const secretKey = createSecretKey(env.secretKey, 'utf-8')
const secretKeyrefresh = createSecretKey(env.secretKeyRefresh, 'utf-8')

// Dummy DB or cache for refresh tokens
const refreshTokens = new Map<string, string>();

export const POST: RequestHandler = async ({ request, cookies }) => {
  const tokenRefresh = cookies.get('x-refresh-token');

  if (!tokenRefresh) {
    return new Response('Refresh token missing', { status: 401 });
  }

  try {
    // Verify the refresh token
    const decoded = await jwtVerify(tokenRefresh, secretKey)

    // Optional: Check if the refresh token is valid in your DB/cache
    if (!refreshTokens.has(tokenRefresh)) {
      return new Response('Invalid refresh token', { status: 403 });
    }

    // Generate new Access Token
    const newAccessToken = refreshToken(decoded.payload.id)

    // Optional: Generate a new refresh token and store it
    const newRefreshToken = jwt.sign({ id: decoded.id }, SECRET_REFRESH, {
      expiresIn: '7d',
    });
    refreshTokens.set(newRefreshToken, decoded.id);
    refreshTokens.delete(refreshToken); // Remove the old one

    // Set cookies
    cookies.set('x-access-token', newAccessToken, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 15, // 15 minutes
    });

    cookies.set('x-refresh-token', newRefreshToken, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return json({ message: 'Tokens refreshed successfully' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response('Invalid or expired refresh token', { status: 403 });
  }
};

