import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
    zIndex: 0,    
    backgroundImage: `url(${'src/assets/table.png'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };
  
  
  return (
    <div className='relative bg-gray-100 w-100 h-80 border-2 rounded-md border-gray-500  p-2' ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}