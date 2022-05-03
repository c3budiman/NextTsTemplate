// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
// import { getSessionFromHeader } from "../../Utils/Helpers/HelperServer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const { data } = await axios.get("https://api.binance.com/api/v3/ticker/24hr");
    // console.log('hitted', data);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
