import React from 'react';
import { useHistory } from 'react-router-dom';

import './style.css';

export default function Header() {
  const history = useHistory();

  return (
    <header>
      <h1 className="title" onClick={() => history.push('/')}>
        NewsCards
      </h1>
    </header>
  );
}
