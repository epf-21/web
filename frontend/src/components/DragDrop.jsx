import React, { useState } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";

const itemsData = [
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
      width: 128,
      height: 128,
      position: {
        x: 126,
        y: 88
      }
    },
    {
      id: 4,
      name: 'Taza de Café',
      imageUrl: 'mug.png',
      width: 256,
      height: 256,
      position: {
        x: 160,
        y: 32
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

export default function FreeDragnDrop() {
  const [items, setItems] = useState(itemsData);
  function handleDragEnd(event) {    
    if (event.over && event.over.id === 'droppable') {
      const item = items.find((x) => x.id === event.active.id);
      item.position.x += event.delta.x;
      item.position.y += event.delta.y;    
      const _items = items.map((x) => {
        if (x.id === item.id) return item;
        return x;
      });
      setItems(_items);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Droppable>
        {items.map((item) => (
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