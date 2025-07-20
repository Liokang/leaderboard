import React, { useState, useEffect } from 'react';
import { getUsers, claimPoints } from '../api';

function UserClaim({ onClaimed }) {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [claimed, setClaimed] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data.users);
    if (res.data.users.length > 0) {
      setSelectedId(res.data.users[0]._id);
    }
  };

  const handleClaim = async () => {
    if (!selectedId) return;
    const res = await claimPoints(selectedId);
    setClaimed(res.data.points);
    onClaimed();
  };

  return (
    <div>
      <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
        {users.map((user) => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>
      <button onClick={handleClaim}>Claim Points</button>
      {claimed && <p className="claim-message">🎉 {claimed} points awarded!</p>}
    </div>
  );
}

export default UserClaim;
