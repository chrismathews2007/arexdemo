import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchUsers,
	addUser,
	updateUser,
	deleteUser,
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

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	const handleEdit = (user) => {
		setEditingUserId(user.id);
		setFormData({
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
		});
		setShowAddForm(true); // Show add user form with pre-filled data
	};

	const handleSaveEdit = () => {
		dispatch(updateUser(formData));
		setEditingUserId(null);
		setFormData({
			id: '',
			name: '',
			email: '',
			role: '',
		});
		setShowAddForm(false); // Hide add user form after saving edit
	};

	const handleAddUser = () => {
		setShowAddForm(true);
		setEditingUserId(null);
	};

	const handleCancelAdd = () => {
		setShowAddForm(false);
		setFormData({
			id: '',
			name: '',
			email: '',
			role: '',
		});
	};

	const handleSaveAdd = () => {
		dispatch(addUser(formData));
		setShowAddForm(false);
		setFormData({
			id: '',
			name: '',
			email: '',
			role: '',
		});
	};

	const handleDelete = (userId) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			dispatch(deleteUser(userId));
		}
	};

	return (
		<div>
			{showAddForm && (
				<div>
					<h2>{editingUserId ? 'Edit User' : 'Add User'}</h2>
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
					<button onClick={editingUserId ? handleSaveEdit : handleSaveAdd}>
						{editingUserId ? 'Save' : 'Add'}
					</button>
					<button onClick={handleCancelAdd}>Cancel</button>
				</div>
			)}
			<button onClick={handleAddUser}>
				{editingUserId ? 'Edit User' : 'Add User'}
			</button>
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
					{users &&
						users.map((user) => (
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
