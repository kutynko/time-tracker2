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
import { authorizeProjectAccess } from "../../utils/authorize";
import { listRequestQuery } from "../../utils/http";

export const routes = Router();
routes.get("/", validate("query", listRequestQuery), getProjects);
routes.post("/", validate("body", postProjectBodySchema), postProject);
routes.get("/:id", authorizeProjectAccess(), getProject);
routes.put(
  "/:id",
  validate("body", putProjectBodySchema),
  authorizeProjectAccess(),
  putProject
);
routes.delete("/:id", authorizeProjectAccess(), deleteProject);