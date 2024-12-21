import { useAuth } from "../context/AuthContext"; // Importa el contexto
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import Movie from "../assets/movie.mp4";
import "../styles/spinner.css";
import Swal from 'sweetalert2';

const Login = () => {
  const { login } = useAuth(); // Obtén la función login del contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Cambia la visibilidad de la contraseña
  };

  const handleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      // Llama a la función login del contexto
      const success = login(email, password);

      if (success) {
        navigate("/dashboard"); // Redirige al Dashboard
      } else {
        Swal.fire({
          icon: "error",
          title: "Incorrecto",
          text: "Contraseña o usuario!",
        });
      }

      setLoading(false); // Desactiva el spinner
    }, 1000); // Cambia 2000ms al tiempo que desees
  };

  const goToRegister = () => {
    navigate("/registro"); // Redirige al Registro
  };

  return (
    <div className="login-container">
      <video autoPlay muted loop className="background-video">
        <source src={Movie} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {loading && (
        <div className="spinner-overlay">
          <div className="sk-folding-cube">
            <div className="sk-cube sk-cube1"></div>
            <div className="sk-cube sk-cube2"></div>
            <div className="sk-cube sk-cube3"></div>
            <div className="sk-cube sk-cube4"></div>
          </div>
        </div>
      )}

      {!loading && (
        <div className="blurred-box">
          <div className="user-login-box">
            <h1 className="tuclase"></h1>
            <span className="user-icon"></span>
            <div className="user-name">Blume-Tech</div>
            <input
              className="user-input"
              type="text"
              placeholder="User name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="user-input"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "25px",
                top: "52%",
                transform: "translateY(150%)",
                cursor: "pointer",
                color: "#555",
              }}
            >
              {showPassword ? "🙉" : "🙈"}
            </span>

            <button className="login-button" onClick={handleLogin}>
              Iniciar Sesión
            </button>
            <button className="login-button" onClick={goToRegister}>
              Registrarse
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
