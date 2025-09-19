import React from 'react';
import { getUsuario, postCredentials, postUsuarios } from './api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(null);

      window.localStorage.removeItem('urbanisse-email');
      window.localStorage.removeItem('urbanisse-password');

      navigate('/login');
    },
    [navigate],
  );

  async function getDataUser(id) {
    const userData = await getUsuario(id);

    setData(userData);
    setLogin(true);

    return userData;
  }

  async function userSignup(newUser) {
    try {
      setError(null);
      setLoading(true);

      const response = await postUsuarios(newUser);
      
      if (response.status === 201) {
        userLogin(newUser.email, newUser.password);
      }
    } catch (error) {
      setError(error.response.data.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  async function userLogin(email, password) {
    try {
      setError(null);
      setLoading(true);

      const authResponse = await postCredentials(email, password);
      const userData = await getDataUser(authResponse.data.user.id);

      window.localStorage.setItem('urbanisse-email', userData.email);
      window.localStorage.setItem('urbanisse-password', userData.password);
      navigate('/');
    } catch (error) {
      setError(error.response.data.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const userEmail = window.localStorage.getItem('urbanisse-email');
      const userPassword = window.localStorage.getItem('urbanisse-password');

      if (userEmail && userPassword) {
        try {
          setError(null);
          setLoading(true);

          await userLogin(userEmail, userPassword);
        } catch (error) {
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }

    autoLogin();
  }, []);

  return (
    <UserContext.Provider
      value={{ userSignup, userLogin, userLogout, data, login, error, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
