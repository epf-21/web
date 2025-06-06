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
  
  const groupColors=[
    '#CCCCCC', //gray
    '#8B0000', //red
    '#FF8C00', //orange
    '#FFD700', //gold
    '#008000', //green
    '#0000CD', //blue
  ]
  
  return (
    <div className='relative inline-block mx-1 w-18 h-18 bg-gray-100 border-3 border-gray-500 rounded-md focus: focus:border-blue-500 cursor-grab' 
    ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <button type='button' 
      className='absolute hover:bg-gray-300 font-semibold text-gray-700 w-5 h-5 p-0 text-xs rounded-sm top-0 right-0' 
      onClick={(event) => {event.stopPropagation(); props.removeItem(props.id)}} 
      onPointerDown={(event) => event.stopPropagation()}
      
      > X </button>
      <img  src={'src/assets/' + props.src} alt={props.name} />
      <span className='absolute block w-full h-3 left-0 bottom-0 rounded-b-sm text-xs text-white font-bold leading-none text-center' 
      style={{backgroundColor: groupColors[props.group]}} >{props.group}</span>
    </div>
  );
}