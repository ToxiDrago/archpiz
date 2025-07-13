import React from 'react';
import qs from 'qs';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Placeholder from '../components/PizzaBlock/Placeholder';
import Pagination from '../components/Pagination';
import { AppContext } from '../App';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = React.useRef(false);

  const { items, status } = useSelector((state) => state.pizza);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = React.useContext(AppContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        categoryId: categoryId > 0 ? categoryId : null,
        sortProperty: sort.sortProperty,
        currentPage,
      };

      const queryString = qs.stringify(params, { skipNulls: true });

      navigate(`/?${queryString}`);
    }

    const getPizzas = async () => {
      const sortBy = sort.sortProperty.replace('-', '');
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `search=${searchValue}` : '';

      if (searchValue) {
        // Загрузи все пиццы (без пагинации)
        dispatch(
          fetchPizzas({
            sortBy,
            order,
            category,
            currentPage: 1, // или не указывай
            noLimit: true, // свой флаг для fetchPizzas
          }),
        );
      } else {
        // Обычная пагинация
        dispatch(
          fetchPizzas({
            sortBy,
            order,
            category,
            currentPage,
          }),
        );
      }

      window.scrollTo(0, 0);
    };

    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage, navigate, dispatch]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sort.sortProperty, categoryId, currentPage, navigate]);

  const pizzas = items
    .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Placeholder key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>Не удалось получить пиццы</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
