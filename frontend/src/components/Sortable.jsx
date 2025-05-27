import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from './SortableItem';

export default function Sortable() {
  const listItems = [
    {
      id: 1,
      name: 'Plato',
      imageUrl: 'plate.png'
    },
    {
      id: 2,
      name: 'Galleta',
      imageUrl: 'saltine_cracker.png'
    },
    {
      id: 3,
      name: 'Cucharilla',
      imageUrl: 'soup_spoon.png'
    },
    {
      id: 4,
      name: 'Taza de Café',
      imageUrl: 'mug.png'
    },
    {
      id: 5,
      name: 'Cuernito',
      imageUrl: 'croissant.png'
    }
  ]
  const [items, setItems] = useState(listItems);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={horizontalListSortingStrategy}
      >
        {items.map(item =>
          <SortableItem key={item.id} id={item.id} src={item.imageUrl} name={item.name} >
          </SortableItem>
        )}
      </SortableContext>
    </DndContext>
  );
}