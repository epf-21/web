import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import Sortable from './Sortable';

export default function DragDrop({ draggableItems, droppedItems, setDroppedItems, setDraggableItems }) {

  const maxItems = 5

  const [activeItemId, setActiveItemId] = useState(null);
  const [sliderValue, setSliderValue] = useState(32);
  const groups = [1, 2, 3, 4, 5]
  const [selectGroup, setSelectGroup] = useState(0);

  const handleSelectChange = (event) => {
    setSelectGroup(event.target.value)
    const item = droppedItems.find((x) => x.id === activeItemId)
    if (item) {
      item.group = event.target.value
      const _items = [...droppedItems]
      setDroppedItems(_items)
    }
  }

  const handleSliderChange = (event) => {
    const val = parseInt(event.target.value)
    setSliderValue(val);
    const item = droppedItems.find((x) => x.id === activeItemId)
    if (item) {
      item.width = val
      item.height = val
      const _items = [...droppedItems]
      setDroppedItems(_items)      
    }
  }

  function handleDragEnd(event) {
    if (event.over && event.over.id === 'droppable') {
      const dgItem = draggableItems.find((x) => x.id === event.active.id)
      if (dgItem) {
        if (droppedItems.length < maxItems) {          
          setDraggableItems(draggableItems.filter((x) => x.id !== event.active.id))
          setDroppedItems([...droppedItems, dgItem])
        }
      }
      const item = droppedItems.find((x) => x.id === event.active.id)
      if (item) {
        setActiveItemId(item.id)
        setSliderValue(item.width)
        setSelectGroup(item.group)
        item.x += event.delta.x;
        item.y += event.delta.y;                
        const _items = [...droppedItems];
        setDroppedItems(_items);        
      }
    } else {
      const item = droppedItems.find((x) => x.id === event.active.id)
      if (item) {
        item.group = 0
        item.x = 0
        item.y = 0
        const filteredItems = droppedItems.filter((x) => x.id !== event.active.id)
        setDroppedItems(filteredItems)
        setDraggableItems([...draggableItems, item])
      }
    }
  }

  
  const contains = (a, b) =>(
    b.x >= a.x &&
    b.y >= a.y &&
    b.x + b.width <= a.x + a.width &&
    b.y + b.height <= a.y + a.height
  );
  
  const overlaps = (a, b) => (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );

  const isCovered = () => {
    for (let i = 1; i < droppedItems.length; i++) {    
      for (let j = 0; j < i; j++) {
        if(contains(droppedItems[i], droppedItems[j])){
          return true
        }
      }
    }
  return false;
  }

  const setGroups =()=>{
    const levels = getLayerLevels()
    droppedItems.map((item,i) => {
      item.group = levels[i]
    })
  }

  function getLayerLevels() {      
    const layerLevels = new Array(droppedItems.length).fill(0);
    for (let i = 0; i < droppedItems.length; i++) {
      let maxOverlapLevel = 0;
      for (let j = 0; j < droppedItems.length; j++) {
        if (i !== j && overlaps(droppedItems[i], droppedItems[j])) {
          maxOverlapLevel = Math.max(maxOverlapLevel, layerLevels[j]);
        }
      }
      layerLevels[i] = maxOverlapLevel + 1;      
    }    
    return layerLevels;    
  }      

  function getPermutations(arr) {
    const permutations = [];

    function permute(current, remaining) {
      if (remaining.length === 0) {
        permutations.push(current);
        return;
      }

      for (let i = 0; i < remaining.length; i++) {
        const next = current.concat(remaining[i]);
        const rest = remaining.slice(0, i).concat(remaining.slice(i + 1));
        permute(next, rest);
      }
    }

    permute([], arr);
    return permutations;
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-4 md:flex-row">
        <div>
          <p className="text-sm font-semibold text-black-rock-950 mb-1">Imágenes subidas</p>
          <p className='text-gray-500 mb-2 text-xs'>(Arrastra hasta {maxItems} elementos)</p>
          <div className="grid grid-cols-2 gap-2 border-2 border-gray-500 rounded-md shadow-sm p-2 w-44 min-h-24">
            {draggableItems.map(item => {
              return (
                <Draggable key={item.id} id={item.id} src={item.imageUrl} 
                  styles={{
                    width: '64px',
                    height: '64px',
                    zIndex: 1,
                  }}
                />
              )
            })
            }
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-1">Imagen principal</h3>
          <p className='text-gray-500 mb-2 text-xs'>(Arrastra y suelta para mover elementos)</p>
          <Droppable>
            {droppedItems.map((item) => (
              <Draggable
                styles={{
                  position: "absolute",
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                  width: `${item.width}px`,
                  height: `${item.height}px`,
                }}
                key={item.id}
                id={item.id}
                src={item.imageUrl}                
              />
            ))}
          </Droppable>
          {(isCovered()) && <p className="text-xs text-red-500 font-semibold">Advertencia hay elementos completamente cubiertos</p>}
          {(droppedItems)&& setGroups()}
          <div className="py-2 rounded-md">
            <p className="text-sm font-semibold text-gray-900 mb-1">Orden de los elementos</p>
            <p className='text-xs text-gray-500 mb-4'>(Arrastra y suelta para ordenar los elementos)</p>
            <Sortable
              draggableItems={draggableItems}
              setDraggableItems={setDraggableItems}
              droppedItems={droppedItems}
              setDroppedItems={setDroppedItems}
              setActiveItemId={setActiveItemId}
              setSliderValue={setSliderValue}
              setSelectGroup={setSelectGroup}
            />
          </div>

          <div className="mt-2 flex gap-4 bg-gray-100 rounded-lg p-2">           
            <div className="flex-1">
              <p>Elemento</p>
              <input
                type="range"
                min="32"
                max="256"
                step="4"
                value={sliderValue}
                onChange={handleSliderChange}
                className="w-full cursor-pointer"
              />
              <p className="text-xs font-semibold text-gray-900">Tamaño: {sliderValue}px</p>
            </div>
             <div className="w-24">
              <p>Grupo</p>
              <select value={selectGroup} onChange={handleSelectChange} className="w-full bg-white p-2 rounded-sm">
                {groups.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
}