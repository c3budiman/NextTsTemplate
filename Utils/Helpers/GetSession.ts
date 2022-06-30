import { getSessionFromHeader } from "./HelperServer";
/**
 * `handleSessions` is a middleware function that handles the sessions.
 *
 *  context is get from server
 *  needlogin, if the page is require authentication set it to true
 *
 *  fromlogin, if the page is from authpage such as /login or /register etc
 *  that u want to redirect to dashboard after login set it to true
 */
// eslint-disable-next-line import/prefer-default-export
export const handleSessions = async (
  ctx: any,
  needLogin = true,
  fromLogin = false,
) => {
  const sessionUser = await getSessionFromHeader(ctx.req);
  if (sessionUser.code === 0) {
    if (fromLogin) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }
    return { props: { ...sessionUser } };
  }
  if (needLogin) {
    return {
      redirect: {
        destination: "/login?code=2",
        permanent: false,
      },
    };
  }
  return { props: { code: -1 } };
};
