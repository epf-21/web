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
    <div className='bg-gray-100 w-50 h-50 border-2 rounded-md border-gray-500 text-center pt-20' ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}