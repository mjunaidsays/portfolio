import { Routes, Route } from 'react-router-dom';
import App from './App';
import ProjectsPage from './pages/ProjectsPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/projects" element={<ProjectsPage />} />
    </Routes>
  );
}
