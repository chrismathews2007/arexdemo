// components/UserList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

import {
	fetchUsers,
	addUser,
	deleteUser,
	updateUser,
} from '../redux/actions/userActions';

const UserList = () => {
	const users = useSelector((state) => state.users.users);
	const dispatch = useDispatch();
	const [editingUserId, setEditingUserId] = useState(null);
	const [formData, setFormData] = useState({
		id: '',
		name: '',
		email: '',
		role: '',
	});
	const [showAddForm, setShowAddForm] = useState(false);
	console.log('users: ', users);

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	const handleEdit = (user) => {
		setEditingUserId(user.id);
		setFormData((prevFormData) => ({
			...prevFormData,
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
		}));
		setShowAddForm(false); // Close add user form if open
	};

	const handleSaveEdit = () => {
		dispatch(updateUser(formData)); // Dispatch the updateUser action with formData
		setEditingUserId(null); // Reset editing state
		setFormData({
			// Reset formData
			id: '',
			name: '',
			email: '',
			role: '',
		});
	};

	const handleDelete = (userId) => {
		console.log(userId);
		if (window.confirm('Are you sure you want to delete this user?')) {
			dispatch(deleteUser(userId));
		}
	};

	const handleAddUser = () => {
		setShowAddForm(true);
		setEditingUserId(null); // Close edit form if open
	};

	const handleCancelAdd = () => {
		setShowAddForm(false);
		setFormData({
			// Reset formData when canceling add user
			id: '',
			name: '',
			email: '',
			role: '',
		});
	};

	const handleSaveAdd = () => {
		const newUser = { ...formData, id: uuidv4() }; // Generate a UUID for the new user
		dispatch(addUser(newUser)); // Dispatch addUser action with the new user data
		setShowAddForm(false);
		setFormData({
			// Reset formData when saving add user
			id: '',
			name: '',
			email: '',
			role: '',
		});
	};

	return (
		<div>
			{showAddForm && (
				<div>
					<h2>Add User</h2>
					<input
						type='text'
						placeholder='Name'
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					/>
					<input
						type='text'
						placeholder='Email'
						value={formData.email}
						onChange={(e) =>
							setFormData({ ...formData, email: e.target.value })
						}
					/>
					<input
						type='text'
						placeholder='Role'
						value={formData.role}
						onChange={(e) => setFormData({ ...formData, role: e.target.value })}
					/>
					<button onClick={handleSaveAdd}>Save</button>
					<button onClick={handleCancelAdd}>Cancel</button>
				</div>
			)}
			<button onClick={handleAddUser}>Add User</button>
			{editingUserId !== null && (
				<div>
					<h2>Edit User</h2>
					<input
						type='text'
						placeholder='Name'
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					/>
					<input
						type='text'
						placeholder='Email'
						value={formData.email}
						onChange={(e) =>
							setFormData({ ...formData, email: e.target.value })
						}
					/>
					<input
						type='text'
						placeholder='Role'
						value={formData.role}
						onChange={(e) => setFormData({ ...formData, role: e.target.value })}
					/>
					<button onClick={handleSaveEdit}>Save</button>
				</div>
			)}
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.role}</td>
							<td>
								<button onClick={() => handleEdit(user)}>Edit</button>
							</td>
							<td>
								<button onClick={() => handleDelete(user.id)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserList;
