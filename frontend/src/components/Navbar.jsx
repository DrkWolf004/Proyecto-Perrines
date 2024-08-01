import { NavLink, useLocation, useNavigate } from "react-router-dom"; // Importa NavLink, useLocation y useNavigate de React Router
import { logout } from "../services/auth.service.js"; // Importa la función de logout del servicio de autenticación

// Componente de barra de navegación
const Navbar = () => {
  const location = useLocation(); // Hook para obtener la ubicación actual
  const navigate = useNavigate(); // Hook para navegar a otras rutas

  // Obtiene el usuario almacenado en el sessionStorage
  const storedUser = JSON.parse(sessionStorage.getItem("usuario"));
  const userRole = storedUser?.data?.rolName; // Obtiene el rol del usuario

  // Función para manejar el cierre de sesión
  const logoutSubmit = () => {
    try {
      logout(); // Llama a la función de logout del servicio de autenticación
      navigate("/"); // Navega a la página de inicio
    } catch (error) {
      console.error("Error al cerrar sesión:", error); // Manejo de errores
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <img src="/cohete.png" alt="Logo metodología de desarrollo" />{" "}
          {/* Logo de la aplicación */}
        </li>
        <li className={location.pathname === "/inicio" ? "active" : ""}>
          <NavLink to="/home">Inicio</NavLink>{" "}
          {/* Enlace a la página de inicio */}
        </li>
        {userRole === "administrador" && ( // Solo muestra estos enlaces si el usuario es administrador
          <>
            <li className={location.pathname === "/usuarios" ? "active" : ""}>
              <NavLink to="/users">Usuarios</NavLink>{" "}
              {/* Enlace a la página de usuarios */}
            </li>
            <li className={location.pathname === "/perros" ? "active" : ""}>
              <NavLink to="/dogs">Perros</NavLink>{" "}
              {/* Enlace a la página de perros */}
            </li>
            <li className={location.pathname === "/anuncios" ? "active" : ""}>
              <NavLink to="/anuncios">Anuncios</NavLink>{" "}
              {/* Enlace a la página de Anuncios */}
            </li>
            <li className={location.pathname === "/veterinarias" ? "active" : ""}>
              <NavLink to="/veterinarias">Veterinarias</NavLink>{" "}
              {/* Enlace a la página de Veterinarias */}
            </li>
            
          </>
        )}
        <li className={location.pathname === "/perfil" ? "active" : ""}>
          <NavLink to="/profile">Perfil</NavLink>{" "}
          {/* Enlace a la página de perfil */}
        </li>
        <li className={location.pathname === "/" ? "active" : ""}>
          <NavLink to="/" onClick={logoutSubmit}>
            Cerrar
          </NavLink>{" "}
          {/* Enlace para cerrar sesión */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
