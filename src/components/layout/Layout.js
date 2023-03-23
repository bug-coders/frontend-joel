import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import arr1 from '../../assets/arrow1.png';
import iconG from '../../assets/gitIcon.png';
import logo from '../../assets/wakapop propio.png';
import topm from '../../assets/top-menu.png';
import Button from '../Button';

import './Layout.css';
import { getIsLogged } from '../../store/selectors.js';
import { useSelector } from 'react-redux';

const Layout = ({ children, onLogout, ...props }) => {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const isLogged = useSelector(getIsLogged) || false;

  const askLogoutConfirmation = () => {
    setConfirmLogout(!confirmLogout);
  };
  return (
    <div>
      <header className="header">
        <div>
          <Link className="header-logo" to="/adverts">
            <img className="logo" src={logo} alt="Wusikando" />
          </Link>
        </div>
        <div className="header-navbar">
          <NavLink className="navlinks" to="/adverts" end>
            | Listado de Anuncios |
          </NavLink>
          <NavLink className="navlinks" to="/adverts/new">
            | Crear Anuncio |
          </NavLink>
        </div>
        {!isLogged && (
          <div className='buttonLogNav'>
            <NavLink to="/registrar" className="navlinks">
              <Button>Registrarse</Button>
              
            </NavLink>
            <NavLink to="/login" className="navlinks">
            <Button>Login</Button>
            </NavLink>
          </div>
        )}
        {isLogged && (
          <div className="header-logout">
            {confirmLogout && (
              <div>
                ¿Seguro que hacer logout?{' '}
                <div>
                  <Button onClick={onLogout}>Sí</Button>
                </div>
                <div>
                  <Button onClick={askLogoutConfirmation}>No</Button>
                </div>
              </div>
            )}
            {!confirmLogout && <Button onClick={askLogoutConfirmation}>Logout</Button>}
          </div>
        )}
              
      </header>

      <div className="bodyHead">
        <div className="header-navbar-mob">
          <details className="lista-detalle">
            <summary>
              <img className="icontop" src={topm} alt="Menu" />
            </summary>
            <ul>
              <li>
                <NavLink className="navlinks" to="/adverts" end>
                  Listado de Anuncios
                </NavLink>
              </li>

              <li>
                <NavLink className="navlinks" to="/adverts/new">
                  Crear Anuncio
                </NavLink>
              </li>

              <li>
                {/* <NavLink to="/registrar" className="navlinks">
                  Registrar usuario
                </NavLink> */}
              </li>
            </ul>
          </details>
        </div>
      </div>
      {children}
      <footer className="footer">
      <div>
            <img className="iconArr" src={arr1} alt="arrow" />
        </div>
        <h5>Vista nuestro repo</h5>
        <div>
          <a href="https://github.com/bug-coders" target="_blank" rel="noopener noreferrer">
            <img className="iconFoot" src={iconG} alt="githubRepo" />
          </a>
        </div>
        
      </footer>
    </div>
  );
};

export default Layout;
