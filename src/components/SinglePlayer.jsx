import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SinglePlayer = ({ APIURL }) => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlayer();
  }, []);

  const fetchPlayer = async () => {
    try {
      const response = await fetch(`${APIURL}/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch player details");
      }
      const { data } = await response.json();
      setPlayer(data.player);
    } catch (error) {
      console.error(`Oh no, trouble fetching player #${id}!`, error);
    }
  };

  const handleBackToList = () => {
    navigate(-1); // Go back to the previous page in the history
  };

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Player Details</h2>
      <p>Name: {player.name}</p>
      <p>Breed: {player.breed}</p>
      <p>Status: {player.status}</p>
      <img src={player.imageUrl} alt={player.name} />
     
      <button onClick={handleBackToList}>Back to List</button>
    </div>
  );
};

export default SinglePlayer;
