import { SignJWT } from 'jose';
import { env } from '$env/dynamic/private';

const Encoder = new TextEncoder();

const secretKey = Encoder.encode(env.secretKey);
const secretKeyRefresh = Encoder.encode(env.secretKeyRefresh);

// console.log("secretKey ", secretKey)
// console.log("secretkeyRe", secretKeyRefresh)

export const generateToken = async (userid: string, username: string) =>
	await new SignJWT({
		id: userid,
		user: username
	})
		.setProtectedHeader({
			alg: 'HS256'
		}) // algorithm
		.setIssuedAt()
		.setIssuer(env.JWT_ISSUER)
		.setAudience(env.JWT_AUDIENCE)
		.setExpirationTime('15 minutes')
		.sign(secretKey);

export const refreshToken = async (userid: string, username: string) =>
	await new SignJWT({
		id: userid,
		user: username
	})
		.setProtectedHeader({
			alg: 'HS256'
		})
		.setIssuedAt()
		.setIssuer(env.JWT_ISSUER)
		.setAudience(env.JWT_AUDIENCE)
		.setExpirationTime('1 week')
		.sign(secretKeyRefresh);
