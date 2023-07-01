import type { NextApiRequest, NextApiResponse } from "next";
import { rejectNull, setSession } from "../../Utils/Helpers/HelperServer";
import axios from "axios";

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
    const beUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"
    const {data, status} = await axios.post(beUrl+"/public/v1/login", {
      username,
      password
    })
    if (status === 200) {
      const HardCodedData = {
        name: data?.user?.name,
        role: "admin",
        organization: "Google",
        accessToken: data?.token,
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
