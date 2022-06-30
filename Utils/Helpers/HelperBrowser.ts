export const isServer = typeof window === "undefined";
export const isClient = !isServer;

export const isDev = process.env.NEXT_PUBLIC_ENVIRONMENT === "DEV";
