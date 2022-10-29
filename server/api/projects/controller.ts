import { NextFunction, Request, Response } from "express";
import {
  createNewProject,
  getProjectById,
  getUserProjects,
  removeProject,
  updateProject,
} from "../../services/projects.service";

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
  const userId = req.user.id;
  try {
    const result = await getProjectById(id, userId);
    res.send(result);
  } catch (e) {
    next(e);
  }
}

export async function putProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  const userId = req.user.id;
  try {
    const result = await updateProject(id, title, userId);
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
  const userId = req.user.id;
  try {
    await removeProject(id, userId);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
}