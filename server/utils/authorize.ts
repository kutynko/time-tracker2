import { NextFunction, Request, Response } from "express";
import { db } from "../database";

export function authorizeProjectAccess() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const projectId = parseInt(req.params.id);
    const userId = req.user.id;
    const project = await db.project.findUnique({
      where: { id: projectId },
      include: { assignments: true },
    });
    if (!project || project.deleted) res.status(404).end();
    else if (project.assignments.every((a) => a.userId !== userId))
      res.status(403).end();
    else next();
  };
}