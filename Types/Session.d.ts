export interface Data {
  name?: string;
  role?: string;
  organization?: string;
  accessToken?: number;
}

export interface Sessions {
  code?: number;
  info?: string;
  data?: Data;
  token?: any | undefined;
}
