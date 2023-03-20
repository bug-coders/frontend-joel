import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import iconT from '../../assets/icons/Twitter.png';
import iconF from '../../assets/icons/Facebook.png';
import iconI from '../../assets/icons/Instagram.png';
import './Layout.css';

const Layout = ({ children, onLogout, ...props }) => {
  const [confirmLogout, setConfirmLogout] = useState(false);

  const askLogoutConfirmation = () => {
    setConfirmLogout(!confirmLogout);
  };
  return (
    <div>
      <header className="header">
        <div>
          <Link className="header-logo" to="/adverts" >
            <strong>WAKAPOP</strong>
          </Link>
        </div>
        <div className="header-navbar">
          <NavLink className="navlinks" to="/adverts" end>
            Listado de Anuncios
          </NavLink>
          <NavLink className="navlinks" to="/adverts/new">
            Crear Anuncio
          </NavLink>
          <NavLink to="/registrar" className="navlinks">
            Registrar usuario
          </NavLink>
        </div>
        <div className="header-logout">
          {confirmLogout && (
            <div>
              ¿Seguro que hacer logout?{' '}
              <div>
                <button onClick={onLogout}>Sí</button>
              </div>
              <div>
                <button onClick={askLogoutConfirmation}>No</button>
              </div>
            </div>
          )}
          {!confirmLogout && <button onClick={askLogoutConfirmation}>Logout</button>}
        </div>
      </header>
      {children}
      <footer className="footer">
            <div>
                <a href="https://twitter.com/?lang=es" target="_blank" rel="noopener noreferrer">
                  <img class="iconFoot" src={iconT} alt="twitter logo"/></a>
            </div>
            <div>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><img class="iconFoot" src={iconI} alt="instagram"/></a>
            </div>
            <div>
                <a href="https://es-es.facebook.com/" target="_blank" rel="noopener noreferrer"><img class="iconFoot" src={iconF} alt="Facebook"/></a>
            </div>
      </footer>
    </div>
  );
};

export default Layout;
