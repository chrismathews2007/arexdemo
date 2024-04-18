import React, { useState, useEffect } from 'react';
import SplitPane from 'react-split-pane';

import { useDrop, useDrag } from 'react-dnd';
import { FaSquarePlus } from 'react-icons/fa6';

import data from '@/data/data.json';
import Dropdown from '../Dropdown';

const style = {
	cursor: 'move',
};

export default function Container() {
	const [ruleName, setRuleName] = useState('');
	const [description, setDescription] = useState('');
	const [inputs, setInputs] = useState([]);
	const [firstInputs, setTodoInputs] = useState([]);
	const [secondInputs, setInprogressInputs] = useState([]);
	const [selectedVersion, setSelectedVersion] = useState('');
	const [selectedRuleDimension, setSelectedRuleDimension] = useState('');
	const [selectedOperator, setSelectedOperator] = useState('');
	const [selectedType, setSelectedType] = useState(new Array(inputs.length));
	const [selectedValue, setSelectedValue] = useState([]);

	const object = {
		ruleName,
		description,
		selectedVersion,
		selectedRuleDimension,
		selectedType,
		firstInputs,
		selectedOperator,
		secondInputs,
	};
	console.log('data: ', object);

	useEffect(() => {
		const storedInputs = JSON.parse(localStorage.getItem('inputs')) || [
			{ id: 1, value: 'firstName' },
		];
		setInputs(storedInputs);
		setSelectedVersion('0.2');
		setSelectedRuleDimension('ruleDimension');
	}, []);

	useEffect(() => {
		setSelectedOperator('==');
	}, []);

	const saveInputsToLocalStorage = (inputs) => {
		localStorage.setItem('inputs', JSON.stringify(inputs));
	};

	const handleCloneInput = () => {
		const lastInput = inputs[inputs.length - 1];
		const newInput = { id: lastInput.id + 1, value: 'lastName' };
		setInputs([...inputs, newInput]);
	};

	const handleDrop = (status) => (item) => {
		const input = item.input;
		if (status === 'firstInput') {
			setTodoInputs([input]);
		} else if (status === 'secondInput') {
			setInprogressInputs([input]);
		}
	};

	const handleInputChange = (index, value) => {
		const newInputs = [...inputs];
		newInputs[index].value = value;
		setInputs(newInputs);
		saveInputsToLocalStorage(newInputs);
	};

	const handleSelectedChange = (index, value) => {
		const updatedSelectedValues = [...selectedValue];
		updatedSelectedValues[index] = value;
		setSelectedValue(updatedSelectedValues);
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
							value={ruleName}
							onChange={(e) => setRuleName(e.target.value)}
						/>
						<select
							className='w-1/4 mr-2 p-2 border rounded'
							value={selectedVersion}
							onChange={(e) => setSelectedVersion(e.target.value)}>
							{data.versions.map((version) => (
								<option key={version.id} value={version.name}>
									{version.name}
								</option>
							))}
						</select>
					</div>
					<div className='flex mb-4'>
						<textarea
							className='w-1/2 p-2 border rounded'
							placeholder='Description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}></textarea>
					</div>
					<div className='flex mb-4'>
						{/* <select
							className='w-1/4 p-2 border rounded'
							value={selectedRuleDimension}
							onChange={(e) => setSelectedRuleDimension(e.target.value)}>
							{data.ruleDimensions.map((dimension) => (
								<option key={dimension.id} value={dimension.id}>
									{dimension.name}
								</option>
							))}
						</select> */}
						<Dropdown
							data={data.ruleDimensions}
							selected={selectedRuleDimension}
							onChange={(value) => setSelectedRuleDimension(value)}
						/>
					</div>
					<div>
						{inputs.map((input, index) => (
							<div
								key={input.id}
								style={{ display: 'flex', gap: 15, margin: '10px 0' }}>
								<DraggableInput
									onChange={(value) => handleInputChange(index, value)}
									value={input.value}
								/>
								<Dropdown
									data={data.inputTypes}
									selected={selectedValue[index]}
									onChange={(value) => handleSelectedChange(index, value)}
								/>
							</div>
						))}
					</div>
					<FaSquarePlus onClick={handleCloneInput} color='red' />
				</div>
			</div>
			<div className='flex justify-between gap-3 p-4'>
				<div className='flex p-4 items-center'>
					<DropArea
						status='firstInput'
						inputs={firstInputs}
						onDrop={handleDrop('firstInput')}
					/>

					<select
						className='w-full p-2 border rounded m-3'
						value={selectedOperator}
						onChange={(e) => setSelectedOperator(e.target.value)}>
						{/* <option value=''>Select</option> */}
						{data.comparisonOperators.map((operator) => (
							<option key={operator.value} value={operator.value}>
								{operator.name}
							</option>
						))}
					</select>

					<DropArea
						status='secondInput'
						inputs={secondInputs}
						onDrop={handleDrop('secondInput')}
					/>
				</div>
			</div>
		</SplitPane>
	);
}

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

	return (
		<div ref={drag}>
			<input
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

const DropArea = ({ status, inputs, onDrop }) => {
	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'input',
		drop: (item) => onDrop(item),
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	return (
		<div ref={drop} className='min-w-60 min-h-10 p-2 border rounded m-3'>
			{inputs.map((input) => (
				<DraggableInput key={input.id} value={input.value} />
			))}
		</div>
	);
};
