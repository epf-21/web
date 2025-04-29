import React from 'react';
import './Board.css'; 

const Board = ({ items, columns }) => {
  
  const handleClick = () => { };
  return (
    <div className="board-container" style={{ gridTemplateColumns: `repeat(${columns}, 64px)` }}>
      {items.map((item, index) => (
        <div key={index} className={"board-item " + item} data-index={index} data-val="0" onClick={handleClick}></div>
      ))}
    </div>
  );
};

export default Board;