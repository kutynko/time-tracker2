import { pino, stdTimeFunctions } from "pino";
import { pinoHttp } from "pino-http";
import { resolve } from "path";
import env from "./config/env";

const logToConsole = {
  target: "pino-pretty",
  level: "debug",
  options: { destination: 1 },
};
const logToFile = {
  target: "pino/file",
  level: "debug",
  options: { destination: resolve(__dirname, "../logs/app.log") },
};

export const logger = pino({
  transport: {
    targets:
      env.nodeEnv === "production" ? [logToFile, logToConsole] : [logToConsole],
  },
  level: env.logLevel,
  timestamp: stdTimeFunctions.isoTime,
});

export const loggerMiddleware = pinoHttp({
  logger,
  customLogLevel: function (req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    } else if (res.statusCode >= 500 || err) {
      return "error";
    }
    return "debug";
  },
});

process.on("uncaughtException", (err) => {
  logger.error(err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  logger.error(err);
  process.exit(1);
});