import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login.tsx";
import NotFound from "../pages/errors/notfound.tsx";
import Dashboard from "../pages/main/main.tsx";
import ProtectedRoute from "../components/protectedRoutes.tsx";
import VerifyCode from '../pages/auth/verify-code.tsx'
import { useAuth } from "../hooks/useAuth"; // кастомный хук для получения текущего пользователя

const App = () => {
  const { user } = useAuth(); // например: { id, name, role }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      <Route path="/404" element={<NotFound />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute isAdmin={user?.role === "admin"}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
