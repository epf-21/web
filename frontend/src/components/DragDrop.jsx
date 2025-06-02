import { useState } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";

export default function DragDrop({draggableItems, droppedItems, setDroppedItems, setDraggableItems}) {

  const [sliderValue, setSliderValue] = useState(16);
  const [activeItemId, setActiveItemId] = useState(0);

  const handleSliderChange = (event) => {
    const val = event.target.value
    setSliderValue(val);
    const item = droppedItems.find((x) => x.id === activeItemId)
      if(item){
        item.width = val;
        item.height = val;    
        const _items = droppedItems.map((x) => {
          if (x.id === item.id) return item;
          return x;
        });
        setDroppedItems(_items);
      }
  }; 
  
  function handleDragEnd(event) {        
    if (event.over && event.over.id === 'droppable') {
      const dgItem = draggableItems.find((x) => x.id === event.active.id)
      if(dgItem){
        setDraggableItems(draggableItems.filter((x) => x.id !== event.active.id))
        setDroppedItems([...droppedItems,dgItem])         
      }      
      const item = droppedItems.find((x) => x.id === event.active.id)
      if(item){        
        setActiveItemId(event.active.id)
        setSliderValue(item.width)
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
        const filteredItems = droppedItems.filter((x) => x.id !== event.active.id)
        setDroppedItems(filteredItems)        
        setDraggableItems([...draggableItems,item])         
      }
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>      
      <div>        
        <h3 className="text-sm font-semibold text-black-rock-950 mb-2">Imágenes subidas</h3>
        <p className='text-gray-500 mb-2 text-xs'>(Arrastra para agregar elementos)</p>
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
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Imagen principal</h3>
        <p className='text-gray-500 mb-2 text-xs'>(Arrastra y suelta para mover elementos)</p>
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
        <div className="mt-2 bg-gray-100 rounded-lg p-2">
          <input
          type="range"
          min="16"
          max="320"
          step="16"
          value={sliderValue}
          onChange={handleSliderChange}
          className="w-full cursor-pointer"
          />
          <p className="text-sm font-semibold text-gray-900">Tamaño: {sliderValue}px</p>
        </div>
      </div>
    </DndContext>    
  );
}