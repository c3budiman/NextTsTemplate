/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { showError } from "./Helpers/AntdHelper";

export async function FetcherPost(
  sessions: any,
  url: string,
  data: any,
) {
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${sessions?.data?.accessToken}` ?? "",
      },
    });

    return response;
  } catch (error) {
    showError(
      "Error!",
      // @ts-ignore
      error?.response?.data?.message
        // @ts-ignore
        ?? error?.response?.data?.info
        ?? "Terjadi Kesalahan pada server!",
    );
    return {
      code: -1,
      info:
        // @ts-ignore
        error?.response?.data?.message
        // @ts-ignore
        ?? error?.response?.data?.info
        ?? "Terjadi Kesalahan pada server!",
    };
  }
}
