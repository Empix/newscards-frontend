import React from 'react';
import { useHistory } from 'react-router-dom';
import { IoMdTrash, IoMdCreate } from 'react-icons/io';

import { usePalette } from 'react-palette';

import './style.css';

import api from '../../services/api';

export default function Card({ data, onDelete }) {
  const { data: palette } = usePalette(encodeURI(data.image_url));
  const history = useHistory();

  function handleDelete(id) {
    api
      .delete(`newscards/${id}`)
      .then(() => {
        onDelete(id);
      })
      .catch((error) => {
        alert('An error occurred while trying to delete the card!');
      });
  }

  return (
    <div className="card" style={{ backgroundColor: palette.vibrant }}>
      <div className="options">
        <div className="edit" onClick={() => history.push(`/edit/${data.id}`)}>
          <IoMdCreate />
        </div>
        <div className="delete" onClick={() => handleDelete(data.id)}>
          <IoMdTrash />
        </div>
      </div>
      <div
        className="header"
        style={{ backgroundImage: `url(${encodeURI(data.image_url)})` }}
      >
        <div
          className="title"
          style={{ backgroundColor: palette.vibrant + '66' }}
        >
          {data.title}
        </div>
      </div>
      <div className="content">
        <p>{data.description}</p>
        <span>
          <strong>Por:</strong> {data.author}
        </span>
        <a
          className="button"
          href={data.url}
          target="_blank"
          rel="noreferrer"
          style={{
            backgroundColor: palette.lightVibrant,
            color: palette.darkMuted,
          }}
        >
          IR PARA A NOTÍCIA
        </a>
      </div>
    </div>
  );
}
