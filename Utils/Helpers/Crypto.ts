import crypto from "crypto";

const algorithm = 'aes-256-gcm';
const secretKey = process.env.NEXT_PUBLIC_APPKEY ?? "";
const iv = crypto.randomBytes(16);
export const hexToBuffer = (hex : string) => Buffer.from(hex, 'hex');

export const encrypt = (text: string) => {
  try {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const firstBlock = cipher.update(text, 'utf8');
    const encrypted = Buffer.concat([firstBlock, cipher.final()]);
    const tag = cipher.getAuthTag();

    return JSON.stringify({
      ivSigned: iv.toString('hex'),
      encrypted: encrypted.toString('hex'),
      tag: tag.toString('hex'),
    });
  } catch (error) {
    return JSON.stringify({
      ivSigned: '',
      encrypted: '',
      tag: '',
    });
  }
};

export const decrypt = (hash: string) => {
  try {
    const { tag, encrypted, ivSigned } = JSON.parse(hash);
    const decipher = crypto.createDecipheriv(
      algorithm,
      secretKey,
      hexToBuffer(ivSigned),
    );
    decipher.setAuthTag(hexToBuffer(tag));
    const firstBlock = decipher.update(hexToBuffer(encrypted));
    const decrypted = Buffer.concat([firstBlock, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    return '';
  }
};
