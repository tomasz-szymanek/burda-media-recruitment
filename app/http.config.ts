import { Config } from "./types/interfaces";

const { env } = process;

export const HttpConfig: Config = {
  port: env.PORT && env.PORT.length ? parseInt(env.PORT, 10) : 3000,
};
