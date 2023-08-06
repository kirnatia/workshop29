import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AllPlayers from './components/AllPlayers';
import NavBar from './components/NavBar';
import NewPlayerForm from './components/NewPlayerForm';
import SinglePlayer from './components/SinglePlayer';

const cohortName = "2302-ACC-PT-WEB-PT-A";
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

const App = () => {
  const [players, setPlayers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  // Define the addPlayer function
  const addPlayer = (newPlayer) => {
    setPlayers([...players, newPlayer]);
    setSuccessMessage('Player added successfully!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000); // Clear the success message after 3 seconds
  };

  return (
    <div>
      <NavBar />
      <Routes>
        {/* Pass the addPlayer function as a prop */}
        <Route path="/" element={<AllPlayers APIURL={APIURL} />} />
        <Route path="/create" element={<NewPlayerForm addPlayer={addPlayer} APIURL={APIURL} />} />
        <Route path="/players/:id" element={<SinglePlayer APIURL={APIURL} />} />
      </Routes>

      {/* Display the success message */}
      {successMessage && <div>{successMessage}</div>}
    </div>
  );
};

export default App;
