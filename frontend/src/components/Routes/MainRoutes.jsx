import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Componentes de las rutas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import NotFoundPage from './pages/NotFoundPage';

// Componente para proteger rutas
const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user, getIdTokenClaims } = useAuth0();

  // Verificar autenticación
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si la ruta tiene un rol específico, verificar roles
  if (role) {
    const roles = user?.['https://example.com/roles'] || []; // Reemplaza con tu namespace
    if (!roles.includes(role)) {
      return <Navigate to="/" />;
    }
  }

  return children;
};

const MainRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas protegidas */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Rutas protegidas con roles */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor-dashboard"
        element={
          <ProtectedRoute role="instructor">
            <InstructorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Página no encontrada */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default MainRoutes;
