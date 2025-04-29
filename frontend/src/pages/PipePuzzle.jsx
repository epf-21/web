import React from 'react'
import Board from '../components/custom/Board'
import  './PipePuzzle.css'

export default function PipePuzzle() {
  const itemsValues=[
    '0','1','2','3','4','pipe-start','6','7','8','9','10','11','12','13',
    '14','15','16','17','18','19','20','21','pipe-end','23','24'
  ];
    return(
        <div className="container">
        <h1><strong>Pregunta Interactiva Armar una Tuberia</strong></h1>
        <p> Esta Pregunta consiste en armar una tuberia usando las piezas que te dan en un determinado limite de tiempo
        (por ejemplo 30 segundos)</p>

        <p> la configuracion del tablero y las piezas a usar estaran guardadas en la base de datos y podran creadas/editadas
        por el profesor</p>

        <div className="piece-container">
        <span className="piece pipe-1"></span>
        <span className="piece pipe-4"></span>
        <span className="piece pipe-6"></span>
        <span className="piece pipe-2"></span>
        <span className="piece pipe-5"></span>
        <span className="piece pipe-3"></span>
        </div>
        <Board items={itemsValues} columns={5} ></Board>
      </div>
      
    )
}