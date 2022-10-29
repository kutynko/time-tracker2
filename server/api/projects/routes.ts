import { Router } from "express";
import {
  deleteProject,
  getProject,
  getProjects,
  postProject,
  postProjectBodySchema,
  putProject,
  putProjectBodySchema,
} from "./controller";
import { validate } from "../../utils/validate";

export const routes = Router();
routes.get("/", getProjects);
routes.post("/", validate("body", postProjectBodySchema), postProject);
routes.get("/:id", getProject);
routes.put("/:id", validate("body", putProjectBodySchema), putProject);
routes.delete("/:id", deleteProject);