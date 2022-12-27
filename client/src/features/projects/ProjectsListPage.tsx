import { useQuery } from "react-query";
import { getAllProjects } from "../../services/projects.service";

export function ProjectsListPage() {
  const { isLoading, data } = useQuery(["projects"], getAllProjects);
  if (isLoading) return <div>загрузка</div>;
  if (!data) return <div>что-то случилось на сервере</div>;
  return (
    <>
      <h1>проекты</h1>
      {data.list.map((p) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </>
  );
}