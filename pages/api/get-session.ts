// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSessionFromHeader } from "../../Utils/Helpers/HelperServer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = await getSessionFromHeader(req);
  res.status(200).json({ ...data });
}
