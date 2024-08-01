import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Error404 from "./pages/Error404";
import EditUser from "./pages/EditUser";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./pages/Users";
import Dogs from "./pages/Dogs";
import Anuncios from "./pages/anuncio";
import EditarAnuncio from "./pages/editAnuncio";
import EditarDog from "./pages/editDog";
import Veterinarias from "./pages/Veterinarias";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas protegidas */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={["administrador"]}>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dogs"
        element={
          <ProtectedRoute allowedRoles={["administrador"]}>
            <Dogs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editDogs/:id"
        element={
          <ProtectedRoute allowedRoles={["administrador"]}>
            <EditarDog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/anuncios"
        element={
          <ProtectedRoute allowedRoles={["administrador"]}>
            <Anuncios />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editA/:id"
        element={
          <ProtectedRoute allowedRoles={["administrador"]}>
            <EditarAnuncio />
          </ProtectedRoute>
        }
      />
      <Route
        path="/veterinarias"
        element={
          <ProtectedRoute allowedRoles={["administrador"]}>
            <Veterinarias />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-user/:rut"
        element={
          <ProtectedRoute>
            <EditUser />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRouter;
