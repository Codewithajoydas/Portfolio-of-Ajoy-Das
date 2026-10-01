import pino from "pino";

const isLocalEnvironment = process.env.NODE_ENV !== "production";

export const logger = isLocalEnvironment
    ? pino({
          transport: {
              target: "pino-pretty",
              options: {
                  colorize: true,
              },
          },
      })
    : {
          info: (...args: unknown[]) => console.info(...args),
          warn: (...args: unknown[]) => console.warn(...args),
          error: (...args: unknown[]) => console.error(...args),
          debug: (...args: unknown[]) => console.debug(...args),
          child: () => logger,
      };