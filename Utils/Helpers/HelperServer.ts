import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export function isJson(item: string) {
  if (typeof item !== "undefined") {
    // eslint-disable-next-line no-param-reassign
    item = typeof item !== "string" ? JSON.stringify(item) : item;
    try {
      // eslint-disable-next-line no-param-reassign
      item = JSON.parse(item);
    } catch (e) {
      return false;
    }

    if (typeof item === "object" && item !== null) {
      return true;
    }
    return false;
  }
  return false;
}

const buildCookiesWithJWT = (
  key: string,
  val: string,
  rememberLogin: boolean,
) => {
  const now = new Date();
  let time = now.getTime();

  // 7 day expires cookie if remember login/ if not 1 day
  let token = "";
  if (!rememberLogin) {
    time += 3600 * 1000 * 24;
    token = jwt.sign({ sess: val }, process.env.APPKEY ?? "secret", {
      expiresIn: "1 days",
    });
  } else {
    time += 3600 * 1000 * 24 * 7;
    token = jwt.sign({ sess: val }, process.env.APPKEY ?? "secret", {
      expiresIn: "7 days",
    });
  }

  now.setTime(time);

  // encrypt jwt token :
  //   token = encryptBro(process.env.APPKEY, token);

  const data = `${key}=${token};`;
  const expires = `expires=${now.toUTCString()};`;
  const path = "path=/;";
  const httpOnly = "httpOnly;";
  const SameSite = "SameSite=Strict;";
  const cookies = data + expires + path + httpOnly + SameSite;

  return {
    token,
    cookies,
  };
};

/**
 * `setSession`
 *
 *  you may no need to build cookies yourself, if your backend already has it
 *
 *
 */
export function setSession(
  req: NextApiRequest,
  res: NextApiResponse,
  inputSession: string,
  keySession = "nms",
) {
  if (!isJson(inputSession)) {
    return { code: 101, info: "Please Use JSON for Input Format.", data: {} };
  }
  const cookiesData = buildCookiesWithJWT(keySession, inputSession, true);
  res.setHeader("Set-Cookie", cookiesData.cookies);
  return {
    code: 0,
    info: "Set Session Berhasil",
    token: cookiesData.token,
  };
}

export function ApiFormat(code: number, info: string, data: any) {
  return { code, info, data };
}

export function rejectNull(str: any, label: string, res: NextApiResponse) {
  const message = `${label} cannot be empty`;

  if (typeof str === "undefined") {
    return res.status(400).json(ApiFormat(400, message, []));
  }
  if (str == null) {
    return res.status(400).json(ApiFormat(400, message, []));
  }
  return true;
}

const getCookieFromBrowser = (key: string) => cookie.get(key);

const getCookieFromServer = (key: string, req: NextApiRequest) => {
  if (!req.headers.cookie) {
    return undefined;
  }

  const rawCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split("=")[1];
};

export const getCookie = (key: string, req: NextApiRequest) => (process.browser
  ? getCookieFromBrowser(key)
  : getCookieFromServer(key, req));

/**
 * `getSessionFromHeader` is basically a function to get cookie from header,
 * parse it and return the session.
 *
 *  req is param from server dont use it on client
 *
 *
 */
export async function getSessionFromHeader(req: NextApiRequest | any) {
  try {
    let token: any;
    token = req.headers?.authorization ?? "";
    let getTokenFromHeader = true;

    const tokenfromcookie = getCookie(
      process.env.APPNAME ?? "c3budimanstarter",
      req,
    );
    if (token === "") {
      token = tokenfromcookie;
      getTokenFromHeader = false;
    }

    if (token !== "") {
      if (token?.length > 7 ?? false) {
        let bearer = token;
        if (getTokenFromHeader) {
          bearer = token.substring(7);
        }

        try {
          const verifiedjwt = await jwt.verify(
            bearer,
            process.env.APPKEY ?? "secret",
          );
          return {
            code: 0,
            info: "ok",
            // @ts-ignore
            data: JSON.parse(verifiedjwt.sess),
          };
        } catch (error) {
          return {
            code: 1,
            info: "Error decoding jwt",
            data: error,
          };
        }
      } else {
        return {
          code: 2,
          info: "Token is not valid",
          data: {
            token,
          },
        };
      }
    } else {
      return {
        code: 3,
        info: "Empty Token",
        data: {
          token,
        },
      };
    }
  } catch (error) {
    return {
      code: 4,
      info: "Error from try-Catch",
      data: error,
    };
  }
}
