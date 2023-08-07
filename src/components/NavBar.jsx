import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const NavBar = () => {
  return (
    <div className='navbar'>
    <p ><Link to="/">Home</Link></p>
    <p ><Link to="/create">Create Player</Link></p>
  </div>

  );
};

export default NavBar;
