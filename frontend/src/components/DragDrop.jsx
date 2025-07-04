import { useState, forwardRef } from "react";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import Sortable from './Sortable';

const DragDrop = forwardRef(({
  draggableItems,
  droppedItems,
  setDroppedItems,
  setDraggableItems,
  showBorders,
  setShowborders,
  getAllAnswers
}, ref) => {

  const backgroundImages = [{
    'id': 1,
    'name': 'mesa',
    'imgUrl': '../src/assets/table.png'
  },
  {
    'id': 2,
    'name': 'sofa',
    'imgUrl': '../src/assets/sofa.png'
  },
  {
    'id': 3,
    'name': 'cama',
    'imgUrl': '../src/assets/bed.png'
  },
  {
    'id': 4,
    'name': 'taburete',
    'imgUrl': '../src/assets/stool.png'
  },

  ]

  const groupColors = [
    '#CCCCCC', //gray
    '#e74c3c', //red
    '#9b59b6', //purple
    '#f1c40f', //yellow
    '#2ecc71', //green
    '#3498db', //blue
  ]

  const maxItems = 5

  const [activeItemId, setActiveItemId] = useState(null);
  const [sliderValue, setSliderValue] = useState(32);
  const groups = [1, 2, 3, 4, 5]
  const [selectGroup, setSelectGroup] = useState(0);  
  const [isCovered, setIsCovered] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState(null);

  const handleSelectChange = (event) => {
    setSelectGroup(event.target.value)
    const item = droppedItems.find((x) => x.id === activeItemId)
    if (item) {
      item.group = parseInt(event.target.value)
      const _items = [...droppedItems]
      setDroppedItems(_items)
      getAllAnswers(_items)     
    }
    
    
  }

  const handleSliderChange = (event) => {
    const val = parseInt(event.target.value)
    setSliderValue(val);
    const item = droppedItems.find((x) => x.id === activeItemId)
    if (item) {
      item.width = val
      item.height = val
      setIsCovered(checkCoveredItems(droppedItems))
      const _items = [...droppedItems]
      setDroppedItems(_items)
      updateGroups(_items)
      getAllAnswers(_items)
    }
  }

  function handleDragEnd(event) {
    if (event.over && event.over.id === 'droppable') {
      const dgItem = draggableItems.find((x) => x.id === event.active.id)
      if (dgItem) {
        if (droppedItems.length < maxItems) {
          setActiveItemId(dgItem.id)          
          setIsCovered(checkCoveredItems([...droppedItems, dgItem]))
          const levels = getLayerLevels([...droppedItems, dgItem])
          dgItem.group = levels[levels.length - 1]
          setSliderValue(dgItem.width)
          setSelectGroup(dgItem.group)
          setDraggableItems(draggableItems.filter((x) => x.id !== event.active.id))
          setDroppedItems([...droppedItems, dgItem])
          getAllAnswers([...droppedItems, dgItem])
        }
      }
      const item = droppedItems.find((x) => x.id === event.active.id)
      if (item) {
        setActiveItemId(item.id)                
        item.x += event.delta.x;
        item.y += event.delta.y;
        setIsCovered(checkCoveredItems(droppedItems))
        const _items = [...droppedItems];
        updateGroups(_items)
        setSliderValue(item.width)
        setSelectGroup(item.group)
        setDroppedItems(_items);
        getAllAnswers(_items)
      }
    } else {
      const item = droppedItems.find((x) => x.id === event.active.id)
      if (item) {
        item.group = 0
        item.x = 0
        item.y = 0
        setActiveItemId(null)
        const filteredItems = droppedItems.filter((x) => x.id !== event.active.id)
        setDroppedItems(filteredItems)
        setDraggableItems([...draggableItems, item])
        getAllAnswers(filteredItems)
      }
    }
  }

  const contains = (a, b) => (
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

  const checkCoveredItems = (items) => {
    for (let i = 1; i < items.length; i++) {
      for (let j = 0; j < i; j++) {
        if (contains(items[i], items[j])) {
          return true
        }
      }
    }
    return false;
  }

  const updateGroups = (items) => {
    const levels = getLayerLevels(items)
    items.map((item, i) => {
      item.group = levels[i]
    })
  }

  function getLayerLevels(items) {
    const layerLevels = new Array(items.length).fill(0);
    for (let i = 0; i < items.length; i++) {
      let maxOverlapLevel = 0;
      for (let j = 0; j < items.length; j++) {
        if (i !== j && overlaps(items[i], items[j])) {
          maxOverlapLevel = Math.max(maxOverlapLevel, layerLevels[j]);
        }
      }
      layerLevels[i] = maxOverlapLevel + 1;
    }
    return layerLevels;
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-3 md:flex-row max-w-2xl p-2 border border-dashed border-gray-400 rounded-lg bg-white shadow-sm">
        <div>
          <p className="text-sm font-semibold text-black-rock-950 mb-1">Imágenes subidas</p>
          <p className='text-gray-500 mb-3 text-xs'>(Arrastra hasta {maxItems} elementos)</p>
          <div className="flex flex-wrap gap-2 w-full md:w-38 min-h-24 border-2 border-gray-500 rounded-md shadow-sm p-2">
            {draggableItems.map(item => {
              return (
                <Draggable key={item.id} id={item.id}
                  styles={{
                    width: '60px',
                    height: '60px',
                    zIndex: 1,
                  }}
                >
                  <img src={item.imageUrl} alt={item.name} className='self-center max-w-full max-h-full' />
                </Draggable>
              )
            })
            }
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-1">Imagen principal</h3>
          <div className="flex justify-between mb-2">
            <p className='text-gray-500 text-xs'>(Arrastra y suelta para mover elementos)</p>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" onChange={() => setShowborders(!showBorders)} className="sr-only peer" />
              <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Mostrar bordes</span>
            </label>
          </div>
          
          <div ref={ref}>
            <Droppable styles={{ backgroundImage: 'url(' + backgroundImg + ')' }}>
              {droppedItems.map((item) => (
                <Draggable
                  styles={{
                    position: "absolute",
                    left: `${item.x}px`,
                    top: `${item.y}px`,
                    width: `${item.width}px`,
                    height: `${item.height}px`,                    
                    outline: showBorders ? '2px solid ' +  groupColors[item.group] : 'none'
                  }}
                  key={item.id}
                  id={item.id}
                >
                  <img src={item.imageUrl} alt={item.name} className='self-center max-w-full max-h-full' />
                </Draggable>
              ))}
            </Droppable>
          </div>
          {(isCovered) && <p className="text-xs text-red-500 font-semibold">Advertencia hay elementos completamente cubiertos</p>}          
          <div className="mt-2 flex gap-4 bg-gray-100 rounded-lg p-2">
            <div className="flex-1">              
              <input
                type="range"
                min="32"
                max="256"
                step="4"
                value={sliderValue}
                onChange={handleSliderChange}
                className="w-full cursor-pointer"
                disabled = {(activeItemId === null)} 
              />
              <p className="text-xs font-semibold text-gray-900">Tamaño: {sliderValue}px</p>
            </div>
            <p>Nivel:</p>
            <div className="w-16">              
              <select value={selectGroup} 
              onChange={handleSelectChange} 
              disabled = {(activeItemId === null)} 
              className="w-full bg-white px-2 py-1 rounded-sm">                
                {groups.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="py-2 rounded-md">
            <p className="text-sm font-semibold text-gray-900 mb-1">Orden de apilamiento de las imagenes</p>
            <p className='text-xs text-gray-500 mb-4'>(Arrastra y suelta para ordenar los elementos)</p>
            <Sortable
              draggableItems={draggableItems}
              setDraggableItems={setDraggableItems}
              droppedItems={droppedItems}
              setDroppedItems={setDroppedItems}
              activeItemId={activeItemId}              
              setActiveItemId={setActiveItemId}
              setSliderValue={setSliderValue}
              setSelectGroup={setSelectGroup}
              updateGroups={updateGroups}
              checkCoveredItems={checkCoveredItems}
              setIsCovered={setIsCovered}              
              getAllAnswers={getAllAnswers}
            />
          </div>          
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-1">Fondo</h3>
          <p className='text-gray-500 mb-3 text-xs'>(selecciona 1)</p>
          <div className="flex flex-wrap gap-2 w-full md:w-20 min-h-24 border-2 border-gray-500 rounded-md shadow-sm p-2">
            <label className="inline-flex items-center cursor-pointer">
                <input type="radio" name="bgOptions" value='' onChange={e => setBackgroundImg(null)} className="sr-only peer" />
                <div className="flex w-16 h-16 bg-gray-200 border-3 border-gray-200 peer-checked:border-blue-500 rounded-md">
                  <span className="p-3 text-xs text-gray-900 font-semibold text-center"> Sin Fondo</span>
                </div>
              </label>
            {backgroundImages.map((img, i) => (
              <label key={i} className="inline-flex items-center cursor-pointer">
                <input type="radio" name="bgOptions" value={img.imgUrl} onChange={e => setBackgroundImg(e.target.value)} className="sr-only peer" />
                <div className="flex w-16 h-16 bg-gray-200 border-3 border-gray-200 peer-checked:border-blue-500 rounded-md">
                  <img src={img.imgUrl} alt={img.name} className="self-center" />
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  );
});

DragDrop.displayName = 'DragDrop';

export default DragDrop;