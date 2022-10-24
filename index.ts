import env from "./server/config/env";
import { app } from "./server/app";
import { logger } from "./server/logger";
import { init } from "./server/database";

init().then(() => {
  logger.info("database connected");
  app.listen(env.port, () => logger.info("server started"));
});