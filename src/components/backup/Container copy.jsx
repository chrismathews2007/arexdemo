import update from 'immutability-helper';
import SplitPane from 'react-split-pane';
import { memo, useCallback, useState } from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';

import { useDrag } from 'react-dnd';
import { FaSquarePlus } from 'react-icons/fa6';
import { Box } from '../Box';
import { Dustbin } from '../Dustbin';
import { ItemTypes } from '../ItemTypes';

const style = {
	cursor: 'move',
};
const Container = memo(function Container() {
	const [dustbins, setDustbins] = useState([
		{ accepts: ['GLASS'], lastDroppedItem: null },
		{ accepts: ['FOOD'], lastDroppedItem: null },
	]);
	const [boxes] = useState([
		{ name: 'Bottle', type: 'GLASS' },
		{ name: 'Banana', type: 'FOOD' },
	]);
	const [droppedBoxNames, setDroppedBoxNames] = useState([]);
	const [inputs, setInputs] = useState([{ id: 1, type: 'GLASS', value: '' }]);
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
	function isDropped(boxName) {
		return droppedBoxNames.indexOf(boxName) > -1;
	}
	const handleDrop = useCallback(
		(index, item) => {
			const { name } = item;
			setDroppedBoxNames(
				update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
			);
			setDustbins(
				update(dustbins, {
					[index]: {
						lastDroppedItem: {
							$set: item,
						},
					},
				})
			);
		},
		[droppedBoxNames, dustbins]
	);
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
									<Box
										name={'firstName'}
										type={input.type}
										isDropped={isDropped('firstName')}
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
					{/* <div style={{ overflow: 'hidden', clear: 'both' }}>
						{boxes.map(({ name, type }, index) => (
							<Box
								name={name}
								type={type}
								isDropped={isDropped(name)}
								key={index}
							/>
						))}
					</div> */}
				</div>
			</div>
			<div>
				<div style={{ overflow: 'hidden', clear: 'both' }}>
					{dustbins.map(({ accepts, lastDroppedItem }, index) => (
						<Dustbin
							accept={accepts}
							lastDroppedItem={lastDroppedItem}
							onDrop={(item) => handleDrop(index, item)}
							key={index}
						/>
					))}
				</div>
			</div>
		</SplitPane>
	);
});

export default Container;
