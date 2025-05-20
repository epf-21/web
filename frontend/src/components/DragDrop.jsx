import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import {Droppable} from './Droppable';
import {Draggable} from './Draggable';

export default function DragDrop() {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (    
    <Draggable>Arrastrame</Draggable>    
  );
  
  return (    
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? draggableMarkup : null}
      <Droppable>
        {isDropped ? draggableMarkup : 'Suelta Aqui'}
      </Droppable>
    </DndContext>    
  );
  
  function handleDragEnd(event) {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }else{
      setIsDropped(false);  
    }
  }
}