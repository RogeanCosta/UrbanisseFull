import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Error from './paginaErro.jsx';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import ProductEditor from './ProductEdit.jsx';
import Header from './Header.jsx';
import Login from './Components/Login/Login.jsx';
import './App.css';
import { UserStorage } from './UserContext.jsx';
import HeaderLogin from './Components/Login/HeaderLogin.jsx';
import ProtectedRouter from './Components/Helper/ProtectedRouter.jsx';

function AppRoutes() {
  const location = useLocation();

  // checa se estamos nas rotas de login
  const isLoginRoute = location.pathname.startsWith('/login');

  return (
    <>
      {isLoginRoute ? <HeaderLogin /> : <Header />}

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouter>
              <ProductList />
            </ProtectedRouter>
          }
        />
        <Route
          path="produtos/:categoria"
          element={
            <ProtectedRouter>
              <ProductList />
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
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <AppRoutes />
      </UserStorage>
    </BrowserRouter>
  );
}

export default App;
