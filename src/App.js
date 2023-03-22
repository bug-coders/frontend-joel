import './App.css';
import AdvertsPage from './components/adverts/AdvertsPage.js';
import LoginPage from './components/auth/LoginPage.js';

import { Routes, Route, Navigate, Link } from 'react-router-dom';
import AdvertPage from './components/adverts/AdvertPage.js';
import NewAdvertPage from './components/adverts/NewAdvertPage.js';
import RequireAuth from './components/auth/RequireAuth.js';
import CreateUser from './components/auth/CreateUser';
import Layout from './components/layout/Layout.js';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLogged } from './store/selectors.js';
import { authLogout } from './store/actions.js';

function App() {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authLogout());
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/adverts" element={<AdvertsPage onLogout={handleLogout} />} />

        <Route path="/adverts/:id" element={<AdvertPage onLogout={handleLogout} />} />
        <Route
          path="/adverts/new"
          element={
            <RequireAuth isLogged={isLogged}>
              <NewAdvertPage onLogout={handleLogout} />
            </RequireAuth>
          }
        />
        <Route path="/" element={<Navigate to="/adverts" />} />

        <Route path="/registrar" element={<CreateUser />} />

        <Route
          path="/404"
          element={
            <div>
              <Layout>
                <div className="not-found">
                  <p>
                    <strong>Error 404</strong>: la dirección que has pedido no existe.{' '}
                  </p>
                  <p>
                    Por favor, verifica la url o
                    <Link to="/adverts"> vuelve al listado de anuncios</Link>
                  </p>
                </div>
              </Layout>
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
