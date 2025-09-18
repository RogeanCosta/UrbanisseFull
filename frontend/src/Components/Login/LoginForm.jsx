import React from 'react';
import useForm from '../../Hooks/useForm';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import './LoginForm.css';
import '../Forms/Button.css';

const LoginForm = () => {
  const email = useForm('email');
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(UserContext);

  function handleSubmit(event) {
    event.preventDefault();

    if (email.validate() && password.validate()) {
      userLogin(email.value, password.value);
    }
  }

  function unlockButton() {
    const filled =
      email.value.trim().length &&
      password.value.trim().length &&
      !email.error &&
      !password.error;
    return !filled;
  }

  return (
    <section className="section-form">
      <h1>Acesse à sua conta</h1>
      <p>Faça login para iniciar a sua sessão</p>

      <form className="form-login" onSubmit={handleSubmit}>
        <Input label="Email" type="text" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button disabled={unlockButton() || loading}>
          {loading ? 'Carregando...' : 'Entrar'}
        </Button>
        {error && <p style={{ color: '#d82929' }}>{error}</p>}
      </form>

      <div className="signup-area">
        <span className="divider">OU</span>
        <h1>Cadastre-se</h1>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className="link-btn" to="cadastrar/">
          Cadastrar
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
