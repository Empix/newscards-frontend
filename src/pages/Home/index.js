import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { IoSearch, IoChevronBack, IoChevronForward } from 'react-icons/io5';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';

import './style.css';

import api from '../../services/api';

export default function Home(props) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api
      .get('newscards')
      .then(({ data }) => {
        setData(data.data);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
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

  function handleSearch(event) {
    event.preventDefault();

    api
      .get('newscards', { params: { search } })
      .then(({ data }) => {
        setData(data.data);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        alert('An unknown error has occurred!');
      });
  }

  function handleChangePage({ selected }) {
    api
      .get('newscards', { params: { page: selected + 1 } })
      .then(({ data }) => {
        setData(data.data);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        alert('An unknown error has occurred!');
      });
  }

  return (
    <div className="container">
      <Header />

      <div className="tool-bar">
        <form onSubmit={handleSearch} className="search">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
          <button type="submit" className="button">
            <IoSearch />
          </button>
        </form>

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

      {data.length !== 0 && (
        <div className="pagination">
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            forcePage={currentPage - 1}
            marginPagesDisplayed={1}
            previousLabel={<IoChevronBack size={20} />}
            nextLabel={<IoChevronForward size={20} />}
            activeLinkClassName="current-page"
            onPageChange={handleChangePage}
            disableInitialCallback={true}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
