import * as express from "express";
import { pinoHttp } from "pino-http";
import { logger, loggerMiddleware } from "./logger";
import { router } from "./api/routes";
import env from "./config/env";

export const app = express();
app.use(pinoHttp(loggerMiddleware));
app.use(express.json());
app.use("/api", router);

app.use((err, req, res, _) => {
  logger.error(err);
  const responseMessage =
    env.nodeEnv === "production" ? "Unexpected server error" : err.message;
  res.status(500).send({ message: responseMessage });
});