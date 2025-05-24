import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import {Droppable} from './Droppable';
import {Draggable} from './Draggable';

export default function DragDrop() {
  const [isDropped, setIsDropped] = useState(false);
  const items = [
  {
   id:1,
   name:'Plato',
   imageUrl:'plate.png'
  },
  {
   id:2,
   name:'Galleta',
   imageUrl:'saltine_cracker.png'
  },
  {
   id:3,
   name:'Cuchara de Sopa',
   imageUrl:'soup_spoon.png'
  },
  {
   id:4,
   name:'taza de te',
   imageUrl:'tea.png'
  }
  ]
  const [selectableItems, setSelectableItems] = useState(items);
  const [selectedItems, setSelectedItems] = useState([]);

  const draggableMarkup = (       
    selectableItems.map((item, idx) =>{
    return(
    <Draggable key={idx} id={item.id}>
      <img src={'src/assets/' + item.imageUrl} width={100} height={100} alt={item.name} />      
    </Draggable>    
    )  
    })
  );

  const droppedMarkup = (       
    selectedItems.map((item, idx) =>{
    return(
    <Draggable key={idx} id={item.id}>
      <img src={'src/assets/' + item.imageUrl } alt={item.name} />      
    </Draggable>    
    )  
    })
  );
  
  return (    
    <DndContext onDragEnd={handleDragEnd}>
      <div className='flex gap-2'>
      {draggableMarkup}
      </div>
      <Droppable> 
        {droppedMarkup.length > 0 ? droppedMarkup :<p className='text-center w-full'>Suelta Aqui</p> }
      </Droppable>
    </DndContext>    
  );
  
  function handleDragEnd(event) {    
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);      
      setSelectableItems(
        selectableItems.filter(item => {
          if (event.active.id == item.id){
            setSelectedItems([...selectedItems,item]) 
          }else{return true}
        })
       );              
    }else{
      setIsDropped(false);
      setSelectedItems(
        selectedItems.filter(item => {
          if (event.active.id == item.id){
            setSelectableItems([...selectableItems,item]) 
          }else{return true}
        })
       );

    }
  }
}