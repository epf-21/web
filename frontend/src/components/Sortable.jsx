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

export default function Sortable({draggableItems, setDraggableItems, droppedItems, setDroppedItems, setActiveItemId, setSliderValue, setSelectGroup}) {

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
        setDroppedItems((droppedItems) => {
        const oldIndex = droppedItems.findIndex(item => item.id === active.id);
        const newIndex = droppedItems.findIndex(item => item.id === over.id);        
        return arrayMove(droppedItems, oldIndex, newIndex);
      });      
    }
    const item = droppedItems.find((x) => x.id === event.active.id)
    setActiveItemId(item.id)
    setSliderValue(item.width)
    setSelectGroup(item.group)
  }

  const removeItem = (id) => {
    const item = droppedItems.find((x) => x.id === id)   
    item.group = 0
    item.x = 0
    item.y = 0    
    setDroppedItems(droppedItems.filter((x) => x.id !== id))
    setDraggableItems([...draggableItems,item])    
  }



  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={droppedItems}
        strategy={horizontalListSortingStrategy}
      >
        {droppedItems.map(item =>
          <SortableItem 
          key={item.id} 
          id={item.id} 
          src={item.imageUrl} 
          group={item.group} 
          removeItem={removeItem}
          >
          </SortableItem>
        )}
      </SortableContext>
    </DndContext>
  );
}