import { useEffect, useState } from 'react';
import Layout from '../layout/Layout.js';
import './AdvertsPage.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../assets/broken-1.png';
import { useDispatch, useSelector } from 'react-redux';
import { getAdvertByIdRedux } from '../../store/selectors.js';
import { advertDelete, advertLoad } from '../../store/actions.js';
import broken from '../../assets/broken-1.png';

const AdvertPage = ({ onLogout }) => {
  const { id } = useParams();

  const advert = useSelector(getAdvertByIdRedux(id)) || {};
  const dispatch = useDispatch();
  const [deleteAd, setDeleteAd] = useState(false);
  const [deletedAd, setDeletedAd] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(advertLoad(id)).catch((error) => {
      if (error.status === 404) {
        const to = location.state?.from?.pathname || '/404';
        navigate(to, { replace: true });
      }
    });
  }, [id, navigate, location, dispatch]);

  const forSale = (sale) => {
    return sale ? 'Vendo' : 'Compro';
  };

  const askDeleteAd = () => {
    setDeleteAd(!deleteAd);
  };

  const handleDeleteAd = () => {
    dispatch(advertDelete(id));
    setDeletedAd(true);
    setTimeout(() => {
      navigate('/adverts');
    }, 1500);
  };

  return (
    <div>
      <Layout onLogout={onLogout}>
        <div className="advertsPage">
          <h1>Detalle del anuncio</h1>
          {!deletedAd && (
            <ul className="advert-container">
              {advert.photo && Object.entries(advert.photo).length > 0 ? (
                <img
                  width="50%"
                  className="photo-container-lista"
                  src={`${process.env.REACT_APP_API_BASE_URL}/images/anuncios/${advert.photo[0].filename}`}
                  alt="Product"
                />
              ) : (
                <img width="50%" className="photo-container-lista" src={broken} alt="No hay foto" />
              )}
              <li>
                <strong>{advert.name}</strong>
              </li>
              <li>{forSale(advert.sale)}</li>
              <li>Precio: {advert.price}€</li>
              <li>Tags: {advert.tags ? advert.tags.join(', ') : advert.tags}</li>
            </ul>
          )}
          <div className="delete-button">
            {!deleteAd && <button onClick={askDeleteAd}>Borrar anuncio</button>}
            {deleteAd && !deletedAd && (
              <div className="delete-confirmation">
                <p> ¿Seguro? No podrás recuperar este anuncio.</p>
                <div>
                  <button onClick={handleDeleteAd}>Confirmar</button>
                  <button onClick={askDeleteAd}>Cancelar</button>
                </div>
              </div>
            )}
            {deletedAd && <div>¡El anuncio ha sido borrado!</div>}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdvertPage;
