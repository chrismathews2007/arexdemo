import React, { useState } from 'react';
import SplitPane from 'react-split-pane';

import { useDrag } from 'react-dnd';
import { FaSquarePlus } from 'react-icons/fa6';

const style = {
	cursor: 'move',
};

export default function Container() {
	const [inputs, setInputs] = useState([{ id: 1, type: '', value: '' }]);
	const [{ opacity }, drag] = useDrag(
		() => ({
			type: 'INPUT',
			item: { id: inputs.length + 1 },
			collect: (monitor) => ({
				opacity: monitor.isDragging() ? 0.4 : 1,
			}),
		}),
		[inputs]
	);

	const handleDuplicate = () => {
		const lastInput = inputs[inputs.length - 1];
		const newInput = { id: lastInput.id + 1, type: '', value: '' };
		setInputs([...inputs, newInput]);
	};
	return (
		<SplitPane split='vertical' defaultSize={700}>
			<div className='flex flex-col justify-between w-full h-full p-4'>
				<div className='flex flex-col mb-4'>
					<div className='flex mb-4'>
						<input
							className='w-1/2 mr-2 p-2 border rounded'
							type='text'
							placeholder='Rule Name'
						/>
						<select className='w-1/4 mr-2 p-2 border rounded'>
							<option value='version1'> 0.1</option>
							<option value='version2'> 0.2</option>
						</select>
					</div>
					<div className='flex mb-4'>
						<textarea
							className='w-1/2 p-2 border rounded'
							placeholder='Description'></textarea>{' '}
					</div>
					<div className='flex mb-4'>
						<select className='w-1/4 p-2 border rounded'>
							<option value='ruleDimension'>Rule Dimension</option>
							<option value='accuracy'>Accuracy</option>
							<option value='completeness'>Completeness</option>
						</select>{' '}
					</div>
					{inputs.map((input) => (
						<div>
							<div key={input.id} className='flex my-3 '>
								<div
									ref={drag}
									style={{ ...style, opacity }}
									data-testid={`box-${input.id}`}>
									<input
										className='w-1/2 mr-2 p-2 border rounded'
										type='text'
										placeholder='Input Field'
									/>
								</div>
								<select className='w-1/4 mr-2 p-2 border rounded'>
									<option value='type1'>Type 1</option>
									<option value='type2'>Type 2</option>
								</select>
							</div>
						</div>
					))}
					<FaSquarePlus onClick={handleDuplicate} color='red' />
				</div>
			</div>
			<div className='flex justify-between gap-3 p-4'>
				<div className='flex p-4 items-center'>
					<input
						className='w-full  p-2 border rounded'
						type='text'
						placeholder='Place Draggable Input'
					/>
					<select className='w-full  p-2 border rounded m-3'>
						<option value='='>=</option>
						<option value='=='>==</option>
						<option value='==='>===</option>
						<option value='!='>!=</option>
						<option value='<='>&lt;=</option>
						<option value='>='>&gt;=</option>
					</select>
					<input
						className='w-full p-2 border rounded'
						type='text'
						placeholder='Place Draggable Input'
					/>
				</div>
			</div>
		</SplitPane>
	);
}
