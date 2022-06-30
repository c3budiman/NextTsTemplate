import type { NextApiRequest, NextApiResponse } from "next";

const buildLogoutCookies = (key: string, val: string) => {
  const now = new Date();
  let time = now.getTime();
  time += 0;
  now.setTime(time);

  const data = `${key}=${val};`;
  const expires = `expires=${now.toUTCString()};`;
  const path = "path=/;";
  const httpOnly = "httpOnly;";
  const SameSite = "SameSite=Strict;";

  return data + expires + path + httpOnly + SameSite;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST" || req.method === "GET") {
    const cookiesData = [buildLogoutCookies(process.env.APPNAME ?? "", "")];

    try {
      res.setHeader("Set-Cookie", cookiesData);
      return res
        .status(200)
        .json({ code: 0, info: "Log Out Success", data: [] });
    } catch (error) {
      return res
        .status(400)
        .json({ code: 0, info: "Something when wrong when set cookies, try clear cookies manually in your browser.", data: [] });
    }
  }
  // Handle any other HTTP method
  return res.status(401).json({
    error: "Invalid Method",
  });
}
