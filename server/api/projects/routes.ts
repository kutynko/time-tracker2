import { Router } from "express";
import {
  deleteProject,
  getProject,
  getProjects,
  postProject,
  putProject,
} from "./controller";

export const routes = Router();
routes.get("/", getProjects);
routes.post("/", postProject);
routes.get("/:id", getProject);
routes.put("/:id", putProject);
routes.delete("/:id", deleteProject);