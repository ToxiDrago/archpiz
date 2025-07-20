import React from 'react';
import qs from 'qs';

import {ThunkDispatch} from "@reduxjs/toolkit";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';

import { selectFilter, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice.ts';

import Categories from '../components/Categories.tsx';
import Sort from '../components/Sort.tsx';
import PizzaBlock from '../components/PizzaBlock/index.tsx';
import Placeholder from '../components/PizzaBlock/Placeholder.tsx';
import Pagination from '../components/Pagination/index.tsx';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice.ts';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

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
      if (searchValue) {
        dispatch(
          fetchPizzas({
            sortBy,
            order,
            category: '',
            search: '',
            currentPage: 1,
            noLimit: true,
          }),
        );
      } else {
        dispatch(
          fetchPizzas({
            sortBy,
            order,
            category,
            search: '',
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

  const filteredItems = searchValue
    ? items.filter((pizza) =>
        pizza.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : items;

  const pizzas = filteredItems.map((obj) => (
    <NavLink key={obj.id} to={`/pizza/${obj.id}`}>
      <PizzaBlock {...obj} />
    </NavLink>
  ));
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
