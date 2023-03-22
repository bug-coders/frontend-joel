import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/wakapop propio.png';
import './LoginPage.css';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin, uiResetError } from '../../store/actions.js';
import { getUi } from '../../store/selectors.js';

const LoginPage = ({ onLogin, ...props }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { isLoading, error } = useSelector(getUi);

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);

  const resetError = () => dispatch(uiResetError());
  const handleRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(authLogin({ email, password }, rememberMe));
    const to = location.state?.from?.pathname || '/';
    navigate(to, { replace: true });
  };

  const isButtonEnabled = () => email.length && password.length && !isLoading;

  return (
    <div className="loginPage">
      <img className="logoLog" src={logo} alt="Wusikando" />
      <h1 className="loginPageTitle">Bienvenido@ a WusikU</h1>
      <h4 className="loginPageTitle">Has login para acceder a los anuncios</h4>
      <form className="loginPage__form" onSubmit={handleSubmit}>
        <div className="loginForm-field">
          <label className="logLabl" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="loginput"
            onChange={handleChangeEmail}
            value={email}
            autoFocus
          />
        </div>
        <div className="loginForm-field">
          <label className="logLabl" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="loginput"
            onChange={handleChangePassword}
            value={password}
          />
        </div>

        <div className="loginForm-field">
          <label htmlFor="rememberMe">Recuérdame</label>
          <input
            type="checkbox"
            name="rememberMe"
            id="rememberMe"
            onChange={handleRememberMe}
            checked={rememberMe}
          />
        </div>
        <div className="submit-form">
          <Button type="submit" className="button" disabled={!isButtonEnabled()}>
            Login
          </Button>
          <Button className="buttonLog">
            <NavLink className="buttonLog" to="/registrar">
              Registrar usuario
            </NavLink>
          </Button>
        </div>
      </form>
      {error && (
        <div className="error-message" onClick={resetError}>
          {error.message}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
