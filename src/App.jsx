import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AllPlayers from './components/AllPlayers';
import NavBar from './components/NavBar';
import NewPlayerForm from './components/NewPlayerForm';
import SinglePlayer from './components/SinglePlayer';
import './App.css';
const cohortName = "2302-ACC-PT-WEB-PT-A";
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

const App = () => {
  const [players, setPlayers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  
  const addPlayer = (newPlayer) => {
    setPlayers([...players, newPlayer]);
  
  };

  return (
    <div>
      <NavBar />
      <Routes>
       
        <Route path="/" element={<AllPlayers APIURL={APIURL} />} />
        <Route path="/create" element={<NewPlayerForm addPlayer={addPlayer} APIURL={APIURL} />} />
        <Route path="/players/:id" element={<SinglePlayer APIURL={APIURL} />} />
      </Routes>
      {successMessage && <div>{successMessage}</div>} 
    </div>
  );
};

export default App;
