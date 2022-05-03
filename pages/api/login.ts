// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { rejectNull, setSession } from "../../Utils/Helpers/HelperServer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (
    rejectNull(req.body.username, "username", res)
    && rejectNull(req.body.password, "password", res)
  ) {
    const { username } = req.body;
    const { password } = req.body;
    if (username === "admin" && password === "admin") {
      const HardCodedData = {
        name: "c3budiman",
        role: "admin",
        organization: "Holywings",
        accessToken: "1234567890",
      };
      const sessionResult = await setSession(
        req,
        res,
        JSON.stringify(HardCodedData),
        process.env.APPNAME ?? "c3budimanstarter",
      );
      if (sessionResult?.code === 0) {
        return res.status(200).json({
          code: 0,
          info: "Login Suceed",
          data: HardCodedData,
          token: sessionResult,
        });
      }
      //  if something went wrong when setting our session...
      return res.status(400).json(sessionResult);
    }
  }
  return res.status(401).json({ message: "Invalid credentials" });
}
