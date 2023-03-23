import { useEffect, useState } from 'react';
import Layout from '../layout/Layout.js';
import './AdvertsPage.css';
import { Link } from 'react-router-dom';
import broken from '../../assets/broken-1.png';
import Filters from './Filters.js';
import { useDispatch, useSelector } from 'react-redux';
import { advertsLoad } from '../../store/actions.js';
import { getAdvertsRedux } from '../../store/selectors.js';

const AdvertsPage = ({ onLogout }) => {
  const adverts = useSelector(getAdvertsRedux) || [];
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(advertsLoad());
  }, [dispatch]);

  const forSale = (sale) => {
    return sale ? 'Vendo' : 'Compro';
  };

  const getAdvertsFilter = (filters) => {
    setFilters(filters);
  };

  let filteredAdverts = adverts;

  filteredAdverts = adverts.filter((advert) => {
    return (
      !filters.length ||
      ((filters[0] === '' || advert.name.toLowerCase().includes(filters[0])) &&
        (filters[1] === '' || filters[1] === advert.sale) &&
        (filters[2] === '' || filters[2] <= advert.price) &&
        (filters[3] === '' || filters[3] >= advert.price) &&
        (!filters[4].length || filters[4].every((tag) => advert.tags.includes(tag))))
    );
  });

  return (
    <Layout onLogout={onLogout}>
      <div className="superContAds">
        <div className="filterList">
          <Filters getAdvertsFilter={getAdvertsFilter} />
        </div>

        {adverts.length ? (
          <ul className="adsGrid">
            {filteredAdverts.length === 0 && (
              <div>
                No hay anuncios que cumplan con esos requisitos. Modifica los filtros o{' '}
                <Link to="/adverts/new">publica un anuncio.</Link>
              </div>
            )}
            {filteredAdverts.reverse().map((advert) => (
              <li key={advert._id}>
                <Link className="advert-detail-link" to={`/adverts/${advert._id}`}>
                  <ul className="advert-container">
                    {advert.photo.length > 0 && advert.photo[0].filename ? (
                      <img
                        width="50%"
                        className="photo-container-lista"
                        src={`${process.env.REACT_APP_API_BASE_URL}/images/anuncios/${advert.photo[0].filename}`}
                        alt="Product"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = broken;
                        }}
                      />
                    ) : (
                      <img
                        width="50%"
                        className="photo-container-lista"
                        src={broken}
                        alt="No hay foto"
                      />
                    )}
                    <li>{forSale(advert.sale)}</li>

                    <li>
                      <strong>{advert.name}</strong>
                    </li>
                    <li>{advert.price}€</li>
                    <li className="tagsF">Categoría/s: {advert.tags && advert.tags.join(', ')}</li>
                  </ul>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            No hay anuncios. <Link to="/adverts/new">¡Publica el primer anuncio!</Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdvertsPage;
