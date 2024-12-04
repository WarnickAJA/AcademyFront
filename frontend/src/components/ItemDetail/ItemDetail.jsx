import React from 'react';

function ItemDetail({ item }) {
  return (
    
    <div className="item-detail">
      <h2>Detalles del Curso</h2>

      <img src={item.imagen} alt={item.titulo} />
      <p>{item.nombreProfesor}</p>
      <h3>{item.titulo}</h3>
      <p>{item.descripcion}</p>
      <div>
       {
        item.descuento && <div> 
                            <div>
                              <s>${item.precio}</s> <p>%{item.porcentajeDescuento}</p>
                            </div>
                            <div>
                              <p>$1000</p>
                            </div>
                          </div>
        } 
      </div>
      
      <button>Comprar</button>

    </div>
  );
}

export default ItemDetail;