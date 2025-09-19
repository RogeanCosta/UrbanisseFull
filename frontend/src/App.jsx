import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Error from "./paginaErro.jsx";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import ProductEditor from "./ProductEdit.jsx";
import Header from "./Header.jsx";
import Login from "./Components/Login/Login.jsx";
import "./App.css";
import { UserStorage } from "./UserContext.jsx";
import HeaderLogin from "./Components/Login/HeaderLogin.jsx";
import ProtectedRouter from "./Components/Helper/ProtectedRouter.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Filter from "./Filters.jsx";
import Perfil from "./Components/Perfil/Perfil.jsx";

function AppRoutes() {
  const location = useLocation();
  const [gender, setGender] = React.useState(null);
  const [stock, setStock] = React.useState(null);
  // checa se estamos nas rotas de login
  const isLoginRoute = location.pathname.startsWith("/login");

  return (
    <>
      {isLoginRoute ? <HeaderLogin /> : <Header />}

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouter>
              <Filter
                setGender={setGender}
                setStock={setStock}
                gender={gender}
                stock={stock}
              />
              <ProductList gender={gender} stock={stock} />
            </ProtectedRouter>
          }
        />
        <Route
          path="produtos/:categoria"
          element={
            <ProtectedRouter>
              <ProductList
                gender={null}
                stock={null}
                setGender={setGender}
                setStock={setStock}
              />
            </ProtectedRouter>
          }
        />
        <Route
          path="novoproduto"
          element={
            <ProtectedRouter>
              <ProductForm />
            </ProtectedRouter>
          }
        />
        <Route
          path="editarproduto/:id"
          element={
            <ProtectedRouter>
              <ProductEditor />
            </ProtectedRouter>
          }
        />
        <Route path="/login/*" element={<Login />} />
        <Route path="*" element={<Error />} />
        <Route
          path="perfil"
          element={
            <ProtectedRouter>
              <Perfil />
            </ProtectedRouter>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      </UserStorage>
    </BrowserRouter>
  );
}

export default App;
