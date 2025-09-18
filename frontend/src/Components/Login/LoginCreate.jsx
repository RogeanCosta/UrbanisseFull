import React from 'react';
import useForm from '../../Hooks/useForm';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import './LoginForm.css';
import '../Forms/Button.css';
import { postUsuarios } from '../../api';

const LoginCreate = () => {
  const name = useForm();
  const email = useForm('email');
  const phone = useForm();
  const password = useForm();
  const checkPassword = useForm();

  const { userSignup, error, loading } = React.useContext(UserContext);

  const passwordsMatch =
    password.value === checkPassword.value || checkPassword === '';
  function unlockButton() {
    const filled =
      name.value.trim().length &&
      email.value.trim().length &&
      phone.value.trim().length &&
      password.value.trim().length &&
      checkPassword.value.trim().length &&
      passwordsMatch;

    return !filled;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newUser = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
    };

    userSignup(newUser);
  }

  return (
    <section className="section-form">
      <h1>Crie uma nova conta</h1>
      <p>Cadastre-se para ter acesso</p>

      <form className="signup-area" onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="name" {...name} />
        <Input label="Email" type="text" name="email" {...email} />
        <Input label="Telefone" type="tel" name="telefone" {...phone} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Input
          label="Confirmar Senha"
          type="password"
          name="confirm-password"
          {...checkPassword}
        />
        <Button disabled={unlockButton() || loading}>
          {loading ? 'Carregando...' : 'Cadastrar'}
        </Button>
        {!passwordsMatch && (
          <p style={{ color: '#d82929' }}>As senhas não conferem</p>
        )}
        {error && <p style={{ color: '#d82929' }}>{error}</p>}
      </form>
    </section>
  );
};

export default LoginCreate;
