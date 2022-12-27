import { Navigate, Route, Routes } from "react-router";
import { ProjectsListPage } from "./features/projects/ProjectsListPage";
import { FullWidthLayout } from "./layouts/FullWidthLayout";

function App() {
  return (
    <Routes>
      <Route
        path="/projects"
        element={
          <FullWidthLayout>
            <ProjectsListPage />
          </FullWidthLayout>
        }
      />
      <Route path="*" element={<Navigate to="/projects" />} />
    </Routes>
  );
}

export default App;