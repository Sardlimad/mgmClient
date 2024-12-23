import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../helpers/ProtectedRoute";
import { Login } from "../Login";
import { Register } from "../Register";
import { Page404 } from "../Page404";
import { AuthLayout } from "../Layouts/AuthLayout";
import { MainLayout } from "../Layouts/MainLayout";
import GuestRoute from "../helpers/GuestRoute";
import { Clients } from "../Clients";
import { Home } from "../Home";
import ClienteForm from "../ClientForm";

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="client">
            <Route index element={<Clients />} />
            <Route path="create" element={<ClienteForm />} />
            {/* <Route path=":idClient"> */}
            <Route path=":IdClient/view" element={<ClienteForm />} />
            <Route path=":IdClient/update" element={<ClienteForm />} />
            {/* </Route> */}
          </Route>
        </Route>
      </Route>

      {/* Ruta 404 */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRouter;
