// actions/userActions.js
import { ADD_USER, UPDATE_USER, DELETE_USER, FETCH_USERS } from './types';

// Action creators
export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const deleteUser = (userId) => ({
    type: DELETE_USER,
    payload: userId,
});


export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('api/users'); // Replace 'api/users' with your API endpoint
      const data = await response.json();
      dispatch({
        type: FETCH_USERS,
        payload: data,
      });
    } catch (error) {
      // Handle error, e.g., dispatch an error action
    }
  };
};
