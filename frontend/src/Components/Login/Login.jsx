import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import LoginCreate from './LoginCreate';
import './Login.css';

const Login = () => {
  return (
    <section className="login">
      <div className="forms">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="cadastrar" element={<LoginCreate />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
