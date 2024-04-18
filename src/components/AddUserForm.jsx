// components/AddUserForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/actions/userActions';

const AddUserForm = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [role, setRole] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const newUser = {
			name,
			email,
			role,
		};
		dispatch(addUser(newUser));
		setName('');
		setEmail('');
		setRole('');
	};

	return (
		<div>
			<h2>Add User</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Role'
					value={role}
					onChange={(e) => setRole(e.target.value)}
				/>
				<button type='submit'>Add User</button>
			</form>
		</div>
	);
};

export default AddUserForm;
