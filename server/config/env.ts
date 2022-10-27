import { config } from "dotenv";
import { InferType, number, object, string } from "yup";

config();

const envSchema = object({
  NODE_ENV: string().oneOf(["development", "production"]).default("production"),
  PORT: number().min(80).max(65000).default(80),
  LOG_LEVEL: string().oneOf(["trace", "debug", "info", "warn", "error"]),
  JWT_SECRET: string().required(),
});

let validated: InferType<typeof envSchema>;
try {
  validated = envSchema.validateSync(process.env);
} catch (e) {
  console.error(e);
}

export default {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  logLevel: process.env.LOG_LEVEL,
  jwtSecret: process.env.JWT_SECRET,
};