import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllPlayers = ({ APIURL }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch(APIURL);
      const { data } = await response.json();
      setPlayers(data.players);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const handleDeletePlayer = async (id) => {
    try {
      await fetch(`${APIURL}/${id}`, { method: 'DELETE' });
      // After successful deletion, remove the deleted player from the players state
      setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  return (
    <div>
      <h2>All Players</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <img src={player.imageUrl} alt={player.name} />
            <p>Player ID: {player.id}</p>
            <p>Name: {player.name}</p>
            <p>Breed: {player.breed}</p>
            <p>Player status: {player.status}</p>
            <Link to={`/players/${player.id}`}>
              <button>See Details</button>
            </Link>
            <button onClick={() => handleDeletePlayer(player.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPlayers;
