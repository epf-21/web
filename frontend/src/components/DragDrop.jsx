import React, { useState } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";

const draggableItemsData = [
    {
      id: 6,
      name: 'Pan blanco',
      imageUrl: 'bread_white.png',
      width: 128,
      height: 128,
      position: {
        x: 0,
        y: 0
      }
    },
    {
      id: 7,
      name: 'Pastel',
      imageUrl: 'cake.png',
      width: 100,
      height: 100,
      position: {
        x: 0,
        y: 0
      }
    },
    {
      id: 8,
      name: 'Leche',
      imageUrl: 'milk.png',
      width: 128,
      height: 128,
      position: {
        x: 0,
        y: 0
      }
    }
  ]
  
  const droppedItemsData = [
    {
      id: 1,
      name: 'Plato',
      imageUrl: 'plate.png',
      width: 256,
      height: 256,
      position: {
        x: 21,
        y: 8
      }
    },
    {
      id: 2,
      name: 'Galleta',
      imageUrl: 'saltine_cracker.png',
      width: 128,
      height: 128,
      position: {
        x: 94,
        y: 36
      }
    },
    {
      id: 3,
      name: 'Cucharilla',
      imageUrl: 'soup_spoon.png',
      width: 100,
      height: 100,
      position: {
        x: 126,
        y: 110
      }
    },
    {
      id: 4,
      name: 'Taza de Café',
      imageUrl: 'mug.png',
      width: 180,
      height: 180,
      position: {
        x: 160,
        y: 82
      }
    },
    {
      id: 5,
      name: 'Cuernito',
      imageUrl: 'croissant.png',
      width: 128,
      height: 128,
      position: {
        x: 52,
        y: 65
      }
    }
  ]


export default function DragDrop() {
  const [draggableItems, setDraggableItems] = useState(draggableItemsData)
  const [droppedItems, setDroppedItems] = useState(droppedItemsData)
  
  function handleDragEnd(event) {    
    if (event.over && event.over.id === 'droppable') {
      const dgItem = draggableItems.find((x) => x.id === event.active.id)
      if(dgItem){
        setDraggableItems(draggableItems.filter((x) => x.id !== event.active.id))
        setDroppedItems([...droppedItems,dgItem]) 
      }      
      const item = droppedItems.find((x) => x.id === event.active.id)
      if(item){
        item.position.x += event.delta.x;
        item.position.y += event.delta.y;    
        const _items = droppedItems.map((x) => {
          if (x.id === item.id) return item;
          return x;
        });
        setDroppedItems(_items);
      }
    }else{
      const item = droppedItems.find((x) => x.id === event.active.id)
      if(item){
        setDroppedItems(droppedItems.filter((x) => x.id !== event.active.id))
        setDraggableItems([...draggableItems,item]) 
      }      
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>      
      <div>        
        <h3 className="text-sm font-semibold text-black-rock-950 mb-3">Imágenes subidas</h3>
        <div className="grid grid-cols-2 gap-1 border-2 border-gray-500 rounded-md shadow-sm p-2 w-44 min-h-24">
        {draggableItems.map(item =>{
          return(
          <Draggable key={item.id} id={item.id} src={item.imageUrl}
            styles={{              
                    width: '64px',
                    height: '64px',
                    zIndex:1,
                  }}
          />
          )  
          })
        }
        </div>
      </div>
      <Droppable>
        {droppedItems.map((item) => (
          <Draggable
            styles={{
              position: "absolute",
              left: `${item.position.x}px`,
              top: `${item.position.y}px`,
              width: `${item.width}px`,
              height: `${item.height}px`,
            }}
            key={item.id}
            id={item.id}            
            src={item.imageUrl}
          />
        ))}
      </Droppable>
    </DndContext>
  );
}