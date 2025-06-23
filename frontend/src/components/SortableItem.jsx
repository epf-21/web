import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const groupColors = [
    '#CCCCCC', //gray
    '#e74c3c', //red
    '#9b59b6', //purple
    '#f1c40f', //yellow
    '#2ecc71', //green
    '#3498db', //blue
  ]

  return (
    <div className='relative inline-block mx-1 p-1 w-18 h-18 bg-gray-200 border-2 border-gray-300 rounded-md cursor-grab'
      ref={setNodeRef} style={{ ...style, ...props.styles }} {...attributes} {...listeners}>
      <button type='button'
        className='absolute hover:bg-gray-300 font-semibold text-gray-700 w-5 h-5 p-0 text-xs rounded-sm top-0 right-0'
        onClick={(event) => { event.stopPropagation(); props.removeItem(props.id) }}
        onPointerDown={(event) => event.stopPropagation()}

      > X </button>
      <img src={props.src} alt={props.name} className='max-w-16 max-h-16' />
      <span className='absolute block w-full h-3 left-0 bottom-0 rounded-b-sm text-xs text-white font-bold leading-none text-center'
        style={{ backgroundColor: groupColors[props.group] }} >{props.group}</span>
    </div>
  );
}