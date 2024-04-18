import React, { useState, useEffect } from 'react';
import SplitPane from 'react-split-pane';
import { FaSquarePlus } from 'react-icons/fa6';

// JSON Data
import data from '@/data/data.json';

// Components
import Dropdown from './Dropdown';
import DraggableInput from './dnd/DraggableInput';
import DropArea from './dnd/DropArea';
import TextInput from './TextInput';

export default function Container() {
	const [ruleName, setRuleName] = useState('');
	const [description, setDescription] = useState('');
	const [inputs, setInputs] = useState([]);
	const [firstInputs, setFirstInputs] = useState([]);
	const [secondInputs, setSecondInputs] = useState([]);
	const [selectedVersion, setSelectedVersion] = useState('');
	const [selectedRuleDimension, setSelectedRuleDimension] = useState();
	const [selectedOperator, setSelectedOperator] = useState();
	const [selectedType, setSelectedType] = useState(new Array(inputs.length));
	const [selectedValue, setSelectedValue] = useState([]);
	const [submitted, setSubmitted] = useState(false); // State to track form submission

	useEffect(() => {
		// localStorage.clear();
		const storedInputs = JSON.parse(localStorage.getItem('inputs')) || [
			{ id: 1, name: '', dataType: {} },
		];
		setInputs(storedInputs);
		setSelectedVersion('0.2');
	}, []);

	const saveInputsToLocalStorage = (inputs) => {
		localStorage.setItem('inputs', JSON.stringify(inputs));
	};

	const handleCloneInput = () => {
		const lastInput = inputs[inputs.length - 1];
		const newInput = { id: lastInput.id + 1, name: '', dataType: '' };
		setInputs([...inputs, newInput]);
	};

	const handleDrop = (status) => (item) => {
		console.log('item:: ');
		const input = item.input;
		if (status === 'firstInput') {
			setFirstInputs([input]);
		} else if (status === 'secondInput') {
			setSecondInputs([input]);
		}
	};
	let timeoutId;

	const handleInputChange = (index, value) => {
		clearTimeout(timeoutId);
		const newInputs = [...inputs];
		newInputs[index].name = value;
		setInputs(newInputs);
		saveInputsToLocalStorage(newInputs);
	};

	const handleSelectedChange = (index, value) => {
		const updatedSelectedValues = [...selectedValue];
		updatedSelectedValues[index] = value;
		setSelectedValue(updatedSelectedValues);

		const updatedInputs = [...inputs];
		updatedInputs[index] = {
			...updatedInputs[index],
			dataType: value,
		};
		setInputs(updatedInputs);
		saveInputsToLocalStorage(updatedInputs);
	};

	const handleSubmit = () => {
		setSelectedVersion('0.1');
		// setSubmitted(true);
		const jsonData = {
			version: selectedVersion,
			ruleDimension: ruleName,
			description: description,
			rule: {
				id: selectedRuleDimension?.id || '',
				name: selectedRuleDimension?.name || '',
			},
			inputs: inputs,
			comparison: [
				{
					firstInput: firstInputs,
					operator: selectedOperator,
					secondInput: secondInputs,
				},
			],
		};
		console.log('jsonData: ', jsonData);
	};

	console.log('firstInputs: ', firstInputs);

	return (
		<div className='flex justify-center bg-slate-100 h-screen'>
			<div className='flex w-[1200px]'>
				<div className='flex flex-col justify-between w-full h-full p-4'>
					<div className='flex flex-col mb-4'>
						<div className='flex mb-4'>
							<TextInput
								placeholder='Rule Name'
								value={ruleName}
								onChange={(e) => setRuleName(e.target.value)}
							/>
							{submitted ? (
								<Dropdown
									data={data.versions}
									selected={selectedVersion}
									onChange={(value) => setSelectedVersion(value)}
									width='min-w-40'
									placeholder='Select Rule'
								/>
							) : null}
						</div>
						<div className='flex mb-4'>
							<TextInput
								placeholder='Description'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								isTextArea
							/>
						</div>
						<div className='flex mb-4'>
							<Dropdown
								data={data.ruleDimensions}
								selected={selectedRuleDimension}
								onChange={(value) => setSelectedRuleDimension(value)}
								width='min-w-40'
								placeholder='Select Rule'
							/>
						</div>
						<div>
							{inputs.map((input, index) => (
								<div
									key={input.id}
									style={{ display: 'flex', gap: 15, margin: '10px 0' }}>
									<DraggableInput
										onChange={(value) => handleInputChange(index, value)}
										name={input.name}
									/>
									<Dropdown
										data={data.inputTypes}
										selected={selectedValue[index] || input.dataType}
										onChange={(value) => handleSelectedChange(index, value)}
										placeholder='Select Data Type'
										width='min-w-40'
									/>
								</div>
							))}
						</div>
						<FaSquarePlus onClick={handleCloneInput} color='blue' size={30} />
					</div>
				</div>
				<div className='flex flex-col justify-between gap-3 p-4'>
					<div className='flex p-4 items-center'>
						<DropArea
							status='firstInput'
							inputs={firstInputs}
							onDrop={handleDrop('firstInput')}
						/>

						<Dropdown
							data={data.comparisonOperators}
							selected={selectedOperator}
							onChange={(value) => setSelectedOperator(value)}
							width='min-w-20'
							placeholder='Select Rule'
						/>

						<DropArea
							status='secondInput'
							inputs={secondInputs}
							onDrop={handleDrop('secondInput')}
						/>
					</div>
					<code>{JSON.stringify(inputs, null, 2)}</code>
					<div className='flex p-4 items-center'>
						{firstInputs?.length > 0 &&
							selectedOperator?.name &&
							secondInputs?.length > 0 && (
								<>
									{firstInputs[0]?.name +
										' ' +
										selectedOperator?.name +
										' ' +
										secondInputs[0]?.name}
								</>
							)}{' '}
					</div>
					<div>
						<button
							type='button'
							className='ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							onClick={handleSubmit}>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
