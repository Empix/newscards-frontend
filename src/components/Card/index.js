import React from 'react';

import { usePalette } from 'react-palette';

import './style.css';

export default function Card({ data }) {
  const { data: palette, error } = usePalette(encodeURI(data.image_url));

  if (error) {
    console.log(error);
  }

  return (
    <div className="card" style={{ backgroundColor: palette.vibrant }}>
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
