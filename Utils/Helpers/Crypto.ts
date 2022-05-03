import crypto from "crypto";

const algorithm = 'aes-256-ctr';
const secretKey = process.env.NEXT_PUBLIC_APPKEY ?? "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfra";
const iv = crypto.randomBytes(16);

export const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return JSON.stringify({
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  });
};

export const decrypt = (hash: string) => {
  const parsedHash = JSON.parse(hash);
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(parsedHash.iv, 'hex'));
  const decrpyted = Buffer.concat([decipher.update(Buffer.from(parsedHash.content, 'hex')), decipher.final()]);
  return decrpyted.toString();
};
