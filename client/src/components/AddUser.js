import React, { useState } from 'react';
import { addUser } from '../api';

function AddUser({ onUserAdded }) {
  const [name, setName] = useState('');

  const handleAdd = async () => {
    if (!name.trim()) return;
    await addUser(name);
    setName('');
    onUserAdded();
  };

  return (
    <div>
      <input
        placeholder="Enter new user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAdd}>Add User</button>
    </div>
  );
}

export default AddUser;
