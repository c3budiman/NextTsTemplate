import type { NextApiRequest, NextApiResponse } from "next";
import { decrypt, encrypt } from "../../Utils/Helpers/Crypto";
import { rejectNull } from "../../Utils/Helpers/HelperServer";

type Data = {
  result: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { type } = req.body;
  const { raw } = req.body;
  const condition = rejectNull(type, "Type", res);

  if (condition) {
    if (type === "encrypt") {
      const encryptResult = encrypt(raw);
      res.status(200).json({ result: encryptResult });
    }
    if (type === "decrypt") {
      const decryptResult = decrypt(raw);
      res.status(200).json({ result: decryptResult });
    }
  }
//   res.status(402).json({ result: "-" });
}
