import { SignJWT } from "jose";
import { env } from "$env/dynamic/private";
import { createSecretKey } from "node:crypto";

const secretKey = createSecretKey(env.secretKey, 'utf-8')

export const generateToken = async (userid: string) => await new SignJWT({
  id: userid
}) // details to  encode in the token
  .setProtectedHeader({
    alg: 'HS256'
  }) // algorithm
  .setIssuedAt()
  .setIssuer(env.JWT_ISSUER) // issuer
  .setAudience(env.JWT_AUDIENCE) // audience
  .setExpirationTime("15 minutes") // token expiration time, e.g., "1 day"
  .sign(secretKey); // secretKey generated from previous step

export const refreshToken = async (userid: string) => await new SignJWT({
  id: userid
}) // details to  encode in the token
  .setProtectedHeader({
    alg: 'HS256'
  }) // algorithm
  .setIssuedAt()
  .setIssuer(env.JWT_ISSUER) // issuer
  .setAudience(env.JWT_AUDIENCE) // audience
  .setExpirationTime("7 days") // token expiration time, e.g., "1 day"
  .sign(secretKey); // secretKey generated from previous step
