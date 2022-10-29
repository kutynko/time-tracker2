import { NextFunction, Request, Response } from "express";
import {
  createNewProject,
  getProjectById,
  getUserProjects,
  removeProject,
  updateProject,
} from "../../services/projects.service";
import { object, string } from "yup";

export async function getProjects(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const result = await getUserProjects(userId);
    res.send(result);
  } catch (e) {
    next(e);
  }
}

export const postProjectBodySchema = object({
  title: string().required(),
});
export async function postProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title } = req.body;
  const userId = req.user.id;
  try {
    const result = await createNewProject(title, userId);
    res.status(201).send(result);
  } catch (e) {
    next(e);
  }
}

export async function getProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = parseInt(req.params.id);
  try {
    const result = await getProjectById(id);
    res.send(result);
  } catch (e) {
    next(e);
  }
}

export const putProjectBodySchema = object({
  title: string().required(),
});
export async function putProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  try {
    const result = await updateProject(id, title);
    res.send(result);
  } catch (e) {
    next(e);
  }
}

export async function deleteProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = parseInt(req.params.id);
  try {
    await removeProject(id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
}