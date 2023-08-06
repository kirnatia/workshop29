import React, { useState } from 'react';

const NewPlayerForm = ({ addPlayer, APIURL }) => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [teamName, setTeamName] = useState('');
  const [breed, setBreed] = useState('');
  const [image, setImage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !owner || !teamName || !breed || !image) {
      alert('Please fill in all fields.');
      return;
    }
    const newPlayer = { name, owner, breed, teamName, imageUrl: image }; // Use imageUrl key to match the API's expected field name
    try {
      const response = await fetch(APIURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlayer),
      });
      if (!response.ok) {
        throw new Error('Failed to add player');
      }
      const { data } = await response.json();
      addPlayer(data.player);
      setIsSuccess(true); // Set the success state to true to display the success message
      // Clear form fields after success
      setName('');
      setOwner('');
      setTeamName('');
      setBreed('');
      setImage('');
    } catch (error) {
      console.error('Error adding player:', error);
      alert('Failed to add player. Please try again.');
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
      <h2>Create New Player</h2>
      {isSuccess ? (
        <div>
          <p>Player has been added successfully!</p>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="breed">Breed:</label>
            <input type="text" id="breed" value={breed} onChange={(e) => setBreed(e.target.value)} />
          </div>
          <div>
            <label htmlFor="owner">Owner:</label>
            <input type="text" id="owner" value={owner} onChange={(e) => setOwner(e.target.value)} />
          </div>
          <div>
            <label htmlFor="teamName">Team Name:</label>
            <input type="text" id="teamName" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="image">Image URL:</label>
            <input type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
          <button type="submit">Add Player</button>
        </form>
      )}
    </div>
  );
};

export default NewPlayerForm;
