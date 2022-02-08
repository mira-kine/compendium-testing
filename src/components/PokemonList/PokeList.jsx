import React from 'react';
import './PokeList.css';

export default function PokeList({ poke }) {
  return (
    <div>
      <div className="poke-container">
        <ul>
          {poke.map((item) => (
            <div key={item.id} className="poke-card">
              <li>{item.pokemon}</li>
              <img className="image" src={item.url_image} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
