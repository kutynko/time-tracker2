import { Request } from "express";
import { number, object, string } from "yup";

type SortOptions = { [column: string]: "desc" | "asc" }[];

export type EntityListRequest = {
  index: number;
  take: number;
  sort: SortOptions;
};

export const listRequestQuery = object({
  index: number().min(0),
  take: number().min(0),
  sort: string(),
});
function parseArraySortQueryExpression(expression: string) {
  return expression.split(",").map<{ [key: string]: "asc" | "desc" }>((s) => {
    const sections = s.split(":");
    if (sections.length === 1 || sections[1] === "asc")
      return { [sections[0]]: "asc" };
    else if (sections[1] === "desc") return { [sections[0]]: "desc" };
    else throw new Error("unknown sort direction");
  });
}

export function getListQueryParams(req: Request): EntityListRequest {
  const index: unknown = req.query.index;
  const take: unknown = req.query.take;
  const sort = req.query.sort;

  const arraySort =
    sort && typeof sort === "string"
      ? parseArraySortQueryExpression(sort)
      : null;

  return {
    index: <number>index ?? 0,
    take: <number>take ?? 200,
    sort: arraySort ?? [{ id: "asc" }],
  };
}

export type EntityListResult<T> = {
  list: T[];
  total: number;
};