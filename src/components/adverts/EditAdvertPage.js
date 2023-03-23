import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { advertEdit, apiTagsLoad } from '../../store/actions.js';
import { getAdvertByIdRedux, getApiTags, getUi, getUser } from '../../store/selectors.js';
import Layout from '../layout/Layout.js';
import './NewAdvertPage.css';
import money from '../../assets/moneyB.png';
import Button from '../Button';

const EditAdvertPage = ({ onLogout }) => {
  const { id } = useParams();

  const advert = useSelector(getAdvertByIdRedux(id));

  const [name, setName] = useState(advert?.name);
  const [description, setDescription] = useState(advert?.description);
  const [sale, setSale] = useState(advert?.sale);
  const apiTags = useSelector(getApiTags);
  const [tags, setTags] = useState(advert?.tags);
  const [price, setPrice] = useState(advert?.price);
  const [photo, setPhoto] = useState(advert?.photo || null);
  const { isLoading } = useSelector(getUi);
  const creator = advert?.creator;
  const user = useSelector(getUser);

  const formData = new FormData();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiTagsLoad());
  }, [dispatch]);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeSale = (event) => {
    const isForSale = event.target.value;
    setSale(isForSale);
  };

  const handleChangeTags = (event) => {
    const tagsArray = Array.from(event.target.selectedOptions);
    const tags = tagsArray.map((option) => {
      return option.value;
    });
    setTags(tags);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleChangePhoto = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      formData.append('name', name);
      formData.append('description', description);
      formData.append('sale', sale);
      formData.append('price', price);
      formData.append('tags', tags);
      formData.append('creator', JSON.stringify(creator));
      photo && formData.append('photo', photo);

      const editedAdvert = await dispatch(advertEdit(formData, id));

      navigate(`/adverts/${editedAdvert._id}`);
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      }
    }
  };

  const isDisabled = () =>
    !(name && (sale || !sale) && tags.length && price && description) || isLoading;

  return (
    <div>
      <Layout onLogout={onLogout}>
        <div className="bodyCont">
          <div className="backimg">
            <div className="formCrea">
              <h1>
                <img className="imgM" src={money} alt="Wusikando" />
                Edita tu anuncio
                <img className="imgM" src={money} alt="Wusikando" />
              </h1>
              <div className="adverts-create-container">
                <form className="formCreate" onSubmit={handleSubmit}>
                  <div className="adverts-create">
                    <div>
                      <label className="labPrice" htmlFor="Name">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="Name"
                        id="Name"
                        placeholder="Nombre"
                        onChange={handleChangeName}
                        value={name}
                        autoFocus
                      />
                    </div>

                    <div>
                      <fieldset
                        className="filter-fieldset-radio"
                        onChange={handleChangeSale}
                        value={sale}
                      >
                        <legend>Tipo de anuncio:</legend>

                        <label htmlFor="Sell">Venta</label>
                        <input type="radio" name="Sell" id="Sell" value={true} />

                        <label htmlFor="Buy">Compra</label>
                        <input type="radio" name="Sell" id="Buy" value={false} />
                      </fieldset>
                    </div>

                    <div className="Price">
                      <label htmlFor="Price" className="labPrice">
                        Precio
                      </label>
                      <input
                        type="number"
                        name="Price"
                        id="Price"
                        placeholder="Precio"
                        onWheel={(event) => event.currentTarget.blur()}
                        onChange={handleChangePrice}
                        value={price}
                      />
                    </div>

                    <div>
                      <label htmlFor="Tags">Tags</label>
                      <select
                        style={{ padding: '20px' }}
                        multiple
                        onChange={handleChangeTags}
                        name="Tags"
                        id="Tags"
                        value={tags}
                      >
                        {apiTags.map((tag) => (
                          <option key={tag} value={tag} id={tag}>
                            {`${tag.charAt(0).toUpperCase() + tag.slice(1)}`}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="labPrice" htmlFor="description">
                        Descripción
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        rows="10"
                        cols="50"
                        maxLength="300"
                        placeholder="Descripción"
                        onChange={handleChangeDescription}
                        value={description}
                      />
                    </div>

                    <input
                      type="file"
                      name="photo"
                      id="photo"
                      className="imgLoader"
                      onChange={handleChangePhoto}
                      accept="image/*"
                    />
                  </div>
                  <Button type="submit" disabled={isDisabled()}>
                    Editar
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default EditAdvertPage;
