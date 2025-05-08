// place files you want to import through the `$lib` alias in this folder.
import crypto from "node:crypto"

export const hashedpassword = async (password: string) => {
  const encodetext = new TextEncoder().encode(password);
  const mydigest = await crypto.subtle.digest({ name: 'SHA-256' }, encodetext);
  const hashedpass = [...new Uint8Array(mydigest)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashedpass;
};
