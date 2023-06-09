import { useEffect, useState } from "react";
import Layout from "../layout/Layout.js";
import "./AdvertDetailPage.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import contact from "../../assets/contact.png";
import { useDispatch, useSelector } from "react-redux";
import { getAdvertByIdRedux, getUser } from "../../store/selectors.js";
import { advertDelete, advertLoad } from "../../store/actions.js";
import broken from "../../assets/broken-1.png";
import Button from "../Button";
import { NavLink } from "react-router-dom";

const AdvertPage = ({ onLogout }) => {
  const { id } = useParams();

  const advert = useSelector(getAdvertByIdRedux(id)) || {};
  const user = useSelector(getUser) || {};
  const dispatch = useDispatch();
  const [deleteAd, setDeleteAd] = useState(false);
  const [deletedAd, setDeletedAd] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(advertLoad(id)).catch((error) => {
      if (error.status === 404) {
        const to = location.state?.from?.pathname || "/404";
        navigate(to, { replace: true });
      }
    });
  }, [id, navigate, location, dispatch]);

  const forSale = (sale) => {
    return sale ? "Vendo" : "Compro";
  };

  const askDeleteAd = () => {
    setDeleteAd(!deleteAd);
  };

  const handleDeleteAd = () => {
    dispatch(advertDelete(id));
    setDeletedAd(true);
    setTimeout(() => {
      navigate("/adverts");
    }, 1500);
  };

  return (
    <div>
      <Layout onLogout={onLogout}>
        <div className="advertsPageDet">
          <h1>Detalle del anuncio</h1>
          {!deletedAd && (
            <ul className="advert-container-det">
              {advert.photo &&
              Object.entries(advert.photo).length > 0 &&
              advert.photo[0].filename ? (
                <img
                  width="50%"
                  className="photo-container-listaDet"
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
              <li>{advert.description}</li>
              <li className="detLab">
                <strong>Categoría/s:</strong>{" "}
                {advert.tags ? advert.tags.join(", ") : advert.tags}
              </li>
              <li className="detLab">
                <p>
                  <strong>¿Te interesa?</strong>
                </p>
                <a
                  className="contactE"
                  href={`mailto: ${advert?.creator?.email}`}>
                  <img
                    className="photo-container-contact"
                    src={contact}
                    alt="contacto"
                  />
                  {advert?.creator?.email}
                </a>
              </li>
            </ul>
          )}
          {user?._id === advert?.creator?._id && (
            <div className="delete-button-det">
              <Button as={Link} to={`/adverts/edit/${id}`}>
                Editar anuncio
              </Button>
              {!deleteAd && (
                <Button onClick={askDeleteAd}>Borrar anuncio</Button>
              )}
              {deleteAd && !deletedAd && (
                <div className="delete-confirmation">
                  <p> ¿Seguro? No podrás recuperar este anuncio.</p>
                  <div>
                    <Button onClick={handleDeleteAd}>Confirmar</Button>
                    <Button onClick={askDeleteAd}>Cancelar</Button>
                  </div>
                </div>
              )}
              {deletedAd && <div>¡El anuncio ha sido borrado!</div>}
            </div>
          )}
          <Button className="button-sign" as={Link} to="/">
            Volver
          </Button>
        </div>
      </Layout>
    </div>
  );
};

export default AdvertPage;
