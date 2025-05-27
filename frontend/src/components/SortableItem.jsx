import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div className='w-24 h-24 mx-1 bg-gray-200 border-2 border-gray-400 rounded-lg inline-block cursor-grab' ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img src={'src/assets/' + props.src} alt={props.name} />
      <p className='w-full text-center font-semibold'>{props.name}</p>
    </div>
  );
}