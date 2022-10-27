import { Strategy, ExtractJwt } from "passport-jwt";
import env from "./config/env";
import * as p from "passport";

const jwtStrategy = new Strategy(
  {
    secretOrKey: env.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  (payload, done) => {
    done(null, {
      id: parseInt(payload.sub),
      name: payload.name,
    });
  }
);

p.use(jwtStrategy);