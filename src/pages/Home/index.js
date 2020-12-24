import React, { useEffect, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';

import Header from '../../components/Header';
import Card from '../../components/Card';

import './style.css';

import api from '../../services/api';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get('newscards')
      .then((response) => {
        setData(response.data.reverse()); // TODO: Arrumar ordem no backend
      })
      .catch((error) => {
        alert('Ocorreu um erro! ', error);
      });
  }, []);

  return (
    <div className="container">
      <Header />

      <div className="tool-bar">
        <div className="input-search">
          <input type="text" placeholder="Search" />
          <button className="input-search-icon">
            <IoMdSearch />
          </button>
        </div>
        <button className="button">NEW</button>
      </div>

      <div className="news">
        {data.map((card) => (
          <Card key={card.id} data={card} />
        ))}
      </div>
    </div>
  );
}
