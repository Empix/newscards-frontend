import React from 'react';
import { IoMdSearch } from 'react-icons/io';

import Header from '../../components/Header';

import './style.css';

export default function Home() {
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
        {(() => {
          let cards = [];

          for (let i = 0; i < 6; i++) {
            cards[i] = (
              <div className="card" key={i}>
                <div className="header">
                  <div className="title">
                    'Cyberpunk 2077' é retirado da loja do PlayStation após
                    críticas por defeitos e problemas
                  </div>
                </div>
                <div className="content">
                  <p>
                    Sony promete reembolso integral para compradores de cópias
                    digitais em seu sistema. Game, um dos mais esperados de
                    2020, foi lançado para PlayStation 4 e outras plataformas no
                    dia 10.
                  </p>
                  <span>
                    <strong>Por:</strong> G1 (g1.globo.com)
                  </span>
                  <button className="button">IR PARA A NOTÍCIA</button>
                </div>
              </div>
            );
          }

          return cards;
        })()}
      </div>
    </div>
  );
}
