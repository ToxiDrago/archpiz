import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import { NavLink } from 'react-router';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://680d6458c47cb8074d904fd5.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }

    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return 'Загрузка...';
  }

  return (
    <div className="container">
      <img src={pizza['imageUrl']} alt="Pizza" />
      <h2>{pizza['title']}</h2>
      <h4>{pizza['price']} рублей</h4>
      <NavLink to="/">
      <button className="button button--outline button--add">
        <span>Назад</span>
      </button>
      </NavLink>
    </div>
  );
};

export default FullPizza;
