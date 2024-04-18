import { useDrop } from 'react-dnd';
import DraggableInput from './DraggableInput';

const DropArea = ({ status, inputs, onDrop }) => {
	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'input',
		drop: (item) => onDrop(item),
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	return (
		<div
			ref={drop}
			className='min-w-60 min-h-10 p-2 border rounded m-3 bg-white'>
			{inputs.map((input) => (
				<span>{input.name} </span>
			))}
		</div>
	);
};

export default DropArea;
