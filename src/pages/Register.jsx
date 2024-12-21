import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Back from '../assets/registro.mp4';
import "../styles/Register.css";
import Swal from 'sweetalert2'


const Registro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const handleRegister = () => {
    if (email && password) {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      
      // Verifica si el usuario ya está registrado
      if (storedUsers.some((u) => u.email === email)) {
        Swal.fire({
          title: 'El usuario ya está registrado',
          text: 'Por favor, intenta con otro correo',
          icon: 'warning',
          background: 'rgba(255, 255, 255, 0.9)', // Fondo con algo de transparencia
          showCancelButton: false,
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#d33', // Rojo para la alerta
          backdrop: `
            rgba(0, 0, 0, 0.4) // Fondo oscuro
            url("https://mejorconsalud.as.com/wp-content/uploads/2016/03/chica-triste-falsas-ilusiones-768x512.jpg?auto=webp&quality=60&width=1920&crop=16:9,smart,safe") // Imagen de fondo opcional
            center left
            no-repeat
            blur(30px) // Efecto blur
          `,
          timer: 3000, // La alerta desaparecerá después de 3 segundos
          timerProgressBar: true, // Barra de progreso del temporizador
        });
        return;
      }

      // Si no está registrado, añade al nuevo usuario
      storedUsers.push({ email, password });
      localStorage.setItem("users", JSON.stringify(storedUsers));
      
      Swal.fire({
        title: 'El usuario ya está registrado',
        text: 'Por favor, intenta con otro correo',
        icon: 'succes',
        background: 'rgba(255, 255, 255, 0.9)', // Fondo con algo de transparencia
        showCancelButton: false,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: 'RGB(65, 204, 177)', // Rojo para la alerta
        backdrop: `
          rgba(0, 0, 0, 0.4) // Fondo oscuro
          url("https://www.etapainfantil.com/wp-content/uploads/2019/09/happycracia.jpg") // Imagen de fondo opcional
          center left
          no-repeat
          blur(30px) // Efecto blur
        `,
        timer: 3000, // La alerta desaparecerá después de 3 segundos
        timerProgressBar: true, // Barra de progreso del temporizador
      });
      navigate('/login'); // Redirige al Login
    } else {
      Swal.fire({
        title: 'Usuario Registrado',
        text: 'Agregando a base de datos',
        icon: 'succes',
        background: 'rgba(255, 255, 255, 0.9)', // Fondo con algo de transparencia
        showCancelButton: false,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: 'RGB(65, 204, 177)', // Rojo para la alerta
        backdrop: `
          rgba(0, 0, 0, 0.4) // Fondo oscuro
          url("https://www.etapainfantil.com/wp-content/uploads/2019/09/happycracia.jpg") // Imagen de fondo opcional
          center left
          no-repeat
          blur(30px) // Efecto blur
        `,
        timer: 3000, // La alerta desaparecerá después de 3 segundos
        timerProgressBar: true, // Barra de progreso del temporizador
      });
    }
  };

  const goToLogin = () => {
    navigate('/login'); // Redirige al Login
  };

  return (
    <div className="login-container">
      <video autoPlay muted loop className="background-video">
        <source src={Back} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className='blurred-box'>
        <div className='user-login-box'>
          <h1 className='tuclase'></h1>
          <span className='user-icon'></span>
          <div className='user-name'>Blume-Tech</div>
          <input className='user-input'
            type="text"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input className='user-input'
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='login-button' onClick={handleRegister}>Registrar</button>
          <button className='login-button' onClick={goToLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Registro;
