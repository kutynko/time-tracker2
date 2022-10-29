import { NextFunction, Request, Response } from "express";
import { db } from "../database";

export function authorizeProjectAccess() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const projectId = parseInt(req.params.id);
    const userId = req.user.id;
    const projects = await db.project.count({
      where: { id: projectId, assignments: { every: { userId } } },
    });
    if (projects > 0) next();
    else res.status(403).end();
  };
}