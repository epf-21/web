import { useState } from 'react';

export default function DragDrop() {
  const [items, setItems] = useState(["Elemento 1", "Elemento 2", "Elemento 3"]);

  const handleDrop = (dragIndex, hoverIndex) => {
    const updatedItems = [...items];
    const [removed] = updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, removed);
    setItems(updatedItems);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Arrastra para ordenar</h1>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("dragIndex", index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const dragIndex = e.dataTransfer.getData("dragIndex");
              handleDrop(dragIndex, index);
            }}
            className="border p-4 mb-2 bg-gray-100 rounded-md cursor-move"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
