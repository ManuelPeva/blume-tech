import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Contexto de autenticación
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute"; //
import TicketForm from "./components/TicketForm";


function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Aseguramos que el contexto esté disponible para todos los componentes */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />

          {/* Ruta protegida */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/tiket" element={<ProtectedRoute><TicketForm/></ProtectedRoute>} />

          {/* Redirige cualquier otra ruta al login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
