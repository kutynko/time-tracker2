import axios from "axios";

interface IProjectAssignment {
  userId: number;
}

interface IProject {
  id: number;
  title: string;
  assignments: IProjectAssignment[];
}

interface IListServerResponse<T> {
  list: T[];
  total: number;
}

export async function getAllProjects() {
  const response = await axios.get<IListServerResponse<IProject>>(
    "/api/projects",
    {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IlJ1c2xhbiIsImlhdCI6MTY2Njc5NDQyN30.FalUljCBn37Wd5Z7Wn4swri2WPzOdkq6fTJjyD2fRzk",
      },
    }
  );
  return response.data;
}