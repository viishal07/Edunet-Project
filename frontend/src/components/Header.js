import React, { useCallback, useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import './style.css';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <Particles options={{ background: { color: '#000' }, particles: { number: { value: 200 }, move: { speed: 2 } } }} />
      <Navbar className="navbarCSS fade-in" expand="lg">
        <Navbar.Brand href="/">Finance Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {user ? <Button className="animated-button" onClick={handleLogout}>Logout</Button> : <Button className="animated-button" onClick={() => navigate('/login')}>Login</Button>}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
