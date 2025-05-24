import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({    
    id: props.id,
  });
  const style = transform ? {    
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,    
  } : undefined;

  
  return (
    <div 
    className='cursor-pointer focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100'
    ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}      
    </div>
  );
}