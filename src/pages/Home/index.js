import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';

import './style.css';

import api from '../../services/api';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get('newscards')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        alert('An unknown error has occurred!');
      });
  }, []);

  const history = useHistory();

  function removeCard(id) {
    const newData = data.filter((card) => card.id !== id);
    setData(newData);
  }

  return (
    <div className="container">
      <Header />

      <div className="tool-bar">
        <input type="text" placeholder="Search" />
        <button className="button" onClick={() => history.push('/new')}>
          NEW
        </button>
      </div>

      <div className="news">
        {data.map((card) => (
          <Card key={card.id} data={card} onDelete={removeCard} />
        ))}

        {data.length === 0 && (
          <div className="not-found">
            <h1>No news card was found!</h1>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
