import { db } from "../database";

export function getUserProjects(userId: number) {
  return db.project.findMany({
    where: { assignments: { every: { userId } }, deleted: false },
    include: { assignments: true },
  });
}

export function getProjectById(projectId: number) {
  return db.project.findFirst({
    where: {
      id: projectId,
      deleted: false,
    },
    include: { assignments: true },
  });
}

export function createNewProject(title: string, userId: number) {
  return db.project.create({
    data: { title, assignments: { create: { userId } } },
    include: { assignments: true },
  });
}

export async function updateProject(id: number, title: string) {
  const project = await db.project.findFirst({
    where: { id, deleted: false },
  });
  if (project) {
    return db.project.update({ data: { title }, where: { id } });
  }
}

export async function removeProject(id: number) {
  const project = await db.project.findFirst({
    where: { id, deleted: false },
  });
  if (project) {
    return db.project.update({ data: { deleted: true }, where: { id } });
  }
}