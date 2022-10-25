import { Router } from "express";
import { routes as projectRoutes } from "./projects/routes";

export const router = Router();
router.get("/", (req, res) => res.send("ok"));
router.use("/projects", projectRoutes);