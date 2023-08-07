import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/playercard.css';

const AllPlayers = ({ APIURL }) => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
      setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>All Players</h2>
      <div>
        <input
          type="text"
          placeholder="Search players..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="container">
        {filteredPlayers.map((player) => (
          <div className="player-card" key={player.id}>
            <img
              src={player.imageUrl}
              alt={player.name}
              className="player-image"
            />
            <div className="player-info">
              <p>Name: {player.name}</p>
              <p>Team: {player.teamName}</p>
              <p>Status: {player.status}</p>
            </div>
            <div><Link to={`/players/${player.id}`}>
              <button>See Details</button><br />
            </Link>
              <button onClick={() => handleDeletePlayer(player.id)}>Delete</button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPlayers;
