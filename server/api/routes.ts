import { Router } from "express";
import { routes as projectRoutes } from "./projects/routes";
import * as p from "passport";

export const router = Router();
router.get("/", (req, res) => res.send("ok"));
router.use(
  "/projects",
  p.authenticate("jwt", { session: false }),
  projectRoutes
);