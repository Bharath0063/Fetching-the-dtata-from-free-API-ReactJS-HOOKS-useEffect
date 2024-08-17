import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';

function First() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users') 
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(userItem => ( 
          <li key={userItem.id}>
            <h2>{userItem.name}</h2>
            <p>{userItem.email}</p>
            <p>{userItem.address.zipcode}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(<First />, document.getElementById('root'));
