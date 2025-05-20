import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({    
    id: 'draggable',
  });
  const style = transform ? {    
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,    
  } : undefined;

  
  return (
    <div 
    className='w-30 cursor-pointer text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
    ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
      <img src='src/assets/cookies-plate.png' />
    </div>
  );
}