import React, { useEffect, useState } from 'react';
import './App.css';
import AddUser from './components/AddUser';
import UserClaim from './components/UserClaim';
import Leaderboard from './components/Leaderboard';
import { getUsers } from './api';

function App() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data.users);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="container">
      <h1>🏆 Leaderboard App</h1>
      <AddUser onUserAdded={loadUsers} />
      <UserClaim onClaimed={loadUsers} />
      <Leaderboard users={users} />
    </div>
  );
}

export default App;
