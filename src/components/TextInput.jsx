import React from 'react';

const TextInput = ({
	className,
	type,
	placeholder,
	value,
	onChange,
	isTextArea,
}) => {
	if (isTextArea) {
		return (
			<textarea
				className='w-1/2 p-2 border rounded'
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		);
	}

	return (
		<input
			className='w-1/2 mr-2 p-2 border rounded'
			type='text'
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
};

export default TextInput;
