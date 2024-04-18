// App.js
import React from 'react';
import { Provider } from 'react-redux';
import UserList from './components/UserList';
import store from './redux/store';
import AddUserForm from './components/AddUserForm';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* <AddUserForm /> */}
        <UserList />
      </div>
    </Provider>
  );
};

export default App;
