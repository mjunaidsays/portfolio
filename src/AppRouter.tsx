import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import App from './App';
import ProjectsPage from './pages/ProjectsPage';

// Scrolls to top on every route change, but not when there is a hash
// (hash navigation is handled by App.tsx on mount).
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}

export default function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </>
  );
}
