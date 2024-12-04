import React from 'react';
import ItemDetail from '../ItemDetail/ItemDetail'; 


function ItemList({ items }) {
  return (
    <div className="item-list">
      <h2>Lista de Cursos</h2>
      <div className="items-grid">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <img src={item.imagen} alt={item.titulo}/>
            <h3>{item.titulo}</h3>
            <button>ver mas</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList;
