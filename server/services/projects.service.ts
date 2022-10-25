import { db } from "../database";

export function getUserProjects(userId: number) {
  return db.project.findMany({
    where: { assignments: { every: { userId } } },
  });
}

export function getProjectById(projectId: number) {
  return db.project.findUnique({
    where: { id: projectId },
  });
}

export function createNewProject(title: string) {
  return db.project.create({ data: { title } });
}

export function updateProject(id: number, title: string) {
  return db.project.update({ data: { title }, where: { id } });
}

export function removeProject(id: number) {
  return db.project.delete({ where: { id } });
}