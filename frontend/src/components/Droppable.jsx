import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div className='bg-gray-100 w-100 h-100 border-2 rounded-md border-gray-500 flex items-center justify-items-center p-2' ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}