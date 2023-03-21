import './Filters.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApiTags } from '../../store/selectors.js';
import { apiTagsLoad } from '../../store/actions.js';
import Button from '../Button';
import filtr from '../../assets/filter_filters_funnel_list_navigation_sort_sorting_icon_123212.webp';

const Filters = ({ getAdvertsFilter }) => {
  const [name, setName] = useState('');
  const [sale, setSale] = useState('');
  const [tags, setTags] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const apiTags = useSelector(getApiTags);
  const dispatch = useDispatch();
  const filters = [name, sale, minPrice, maxPrice, tags];

  useEffect(() => {
    dispatch(apiTagsLoad());
  }, [dispatch]);

  useEffect(() => {
    getAdvertsFilter(filters);
  }, [name, sale, minPrice, maxPrice, tags]);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeSale = (event) => {
    let isForSale = event.target.value;
    if (isForSale === 'true') {
      isForSale = true;
    }
    if (isForSale === 'false') {
      isForSale = false;
    }

    setSale(isForSale);
  };

  const handleChangeTags = (event) => {
    const tagsArray = Array.from(event.target.selectedOptions);
    let tags = tagsArray.map((option) => {
      return option.value;
    });
    tags = tags.filter((tag) => tag !== '');
    setTags(tags);
  };

  //TODO controlar que precio mínimo sea menor que máximo y viceversa
  const handleChangeMinPrice = (event) => {
    if (event.target.value === '') {
      setMinPrice('');
    } else {
      setMinPrice(event.target.value);
    }
  };

  const handleChangeMaxPrice = (event) => {
    if (event.target.value === '') {
      setMaxPrice('');
    } else {
      setMaxPrice(event.target.value);
    }
  };
  //----------------------

  return (
    <form className="adverts-filters-container">
      <div className="adverts-filters">
        <div>
          <input
            type="text"
            name="byName"
            id="byName"
            placeholder="Qué buscas"
            onChange={handleChangeName}
            value={name}
          />
        </div>

        <fieldset className="filter-fieldset-radio" onChange={handleChangeSale} value={sale}>
          <div className="radioCont">
            <label className="radioLabel" htmlFor="bySell">
              Venta
            </label>
            <input type="radio" name="bySell" id="bySell" value={true} />
          </div>

          <div className="radioCont">
            <label className="radioLabel" htmlFor="byBuy">
              Compra
            </label>
            <input type="radio" name="bySell" id="byBuy" value={false} />
          </div>
          <div className="radioCont">
            <label className="radioLabel" htmlFor="All">
              Todos
            </label>
            <input type="radio" name="bySell" id="All" value="" />
          </div>
        </fieldset>

        <div className="byPrice">
          <label className="labFilter" htmlFor="byPrice">
            Por precio
          </label>
          <input
            type="number"
            name="byPrice"
            id="byPriceMin"
            placeholder="Precio mínimo"
            onWheel={(event) => event.currentTarget.blur()}
            onChange={handleChangeMinPrice}
            value={minPrice}
          />
          <input
            type="number"
            name="byPrice"
            id="byPriceMax"
            placeholder="Precio máximo"
            onWheel={(event) => event.currentTarget.blur()}
            onChange={handleChangeMaxPrice}
            value={maxPrice}
          />
        </div>

        <div className="filter-fieldset-tags">
          <label htmlFor="byTags">Categorías</label>
          <select
            name="byTags"
            id="byTags"
            style={{ padding: '20px' }}
            multiple
            onChange={handleChangeTags}
            value={tags}
          >
            <option key="none" value="" id="none">
              ---
            </option>
            {apiTags.map((tag) => {
              return (
                <option key={tag} value={tag} id={tag}>
                  {`${tag.charAt(0).toUpperCase() + tag.slice(1)}`}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <details className="lista-detalle-filtro">
        <summary>
          <h3>Filtros-</h3>
          <img className="icontop" src={filtr} alt="Menu" />
        </summary>
        <ul>
          <li>
            <input
              type="text"
              name="byName"
              id="byName"
              placeholder="Por Nombre"
              onChange={handleChangeName}
              value={name}
            />
          </li>

          <li>
            <fieldset className="filter-fieldset-radio" onChange={handleChangeSale} value={sale}>
              <legend>Tipo de anuncio:</legend>

              <div className="radioCont">
                <label className="radioLabel" htmlFor="bySell">
                  Venta
                </label>
                <input type="radio" name="bySell" id="bySell" value={true} />
              </div>

              <div className="radioCont">
                <label className="radioLabel" htmlFor="byBuy">
                  Compra
                </label>
                <input type="radio" name="bySell" id="byBuy" value={false} />
              </div>
              <div className="radioCont">
                <label className="radioLabel" htmlFor="All">
                  Todos
                </label>
                <input type="radio" name="bySell" id="All" value="" />
              </div>
            </fieldset>
          </li>

          <li>
            <input
              type="number"
              name="byPrice"
              id="byPriceMin"
              placeholder="Precio mínimo"
              onWheel={(event) => event.currentTarget.blur()}
              onChange={handleChangeMinPrice}
              value={minPrice}
            />
            <input
              type="number"
              name="byPrice"
              id="byPriceMax"
              placeholder="Precio máximo"
              onWheel={(event) => event.currentTarget.blur()}
              onChange={handleChangeMaxPrice}
              value={maxPrice}
            />
          </li>
          <li>
            <select
              name="byTags"
              id="byTags"
              style={{ padding: '20px' }}
              multiple
              onChange={handleChangeTags}
              value={tags}
            >
              <option key="none" value="" id="none">
                ---
              </option>
              {apiTags.map((tag) => {
                return (
                  <option key={tag} value={tag} id={tag}>
                    {`${tag.charAt(0).toUpperCase() + tag.slice(1)}`}
                  </option>
                );
              })}
            </select>
          </li>
        </ul>
      </details>
    </form>
  );
};

export default Filters;
