import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";

export const db = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "event", level: "error" },
    { emit: "event", level: "warn" },
    { emit: "event", level: "info" },
  ],
});

db.$on("query", (e) =>
  logger.debug({ query: e.query, params: e.params, duration: e.duration })
);

db.$on("error", (e) => logger.error(e));
db.$on("warn", (e) => logger.warn(e));
db.$on("info", (e) => logger.info(e));

export function init() {
  return db.$connect();
}