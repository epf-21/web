import { useDraggable } from '@dnd-kit/core';

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;


  return (
    <div
      className='cursor-grab flex focus:ring-2 focus:ring-blue-500 rounded-sm'
      ref={setNodeRef} style={{ ...style, ...props.styles }} {...listeners} {...attributes}>
      {props.children}
      
    </div>
  );
}