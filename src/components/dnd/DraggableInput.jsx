import { useDrag } from 'react-dnd';

const DraggableInput = ({ onChange, value }) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'input',
		item: { input: { id: Date.now(), value } },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	const handleInputChange = (e) => {
		onChange(e.target.value);
	};

	console.log('VALUE::', value);

	return (
		<div>
			<input
				ref={drag}
				type='text'
				value={value}
				onChange={handleInputChange}
				className={`cursor-move ${
					isDragging ? 'opacity-50' : 'opacity-100'
				} w-full p-2 border rounded`}
			/>
		</div>
	);
};

export default DraggableInput;
