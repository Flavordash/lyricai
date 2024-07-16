// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from './logo1.png'; // Ensure you have a logo.png file in the src/components directory

const Nav = styled.nav`
  position: relative;
  background-color: lightgray; /* Light gray background */
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between items */
`;

const Logo = styled.img`
  height: 40px;
  margin-right: 1rem;
`;

const NavList = styled.ul`
  list-style: none;
  display: ${props => (props.open ? 'block' : 'none')};
  padding: 0;
  margin: 0;
  position: absolute;
  top: 60px; /* Adjust based on your header height */
  left: 0;
  right: 0;
  width: 139px; /* Set the width of the dropdown menu */
  background-color: lightgray;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;

  @media(min-width: 768px) {
    display: flex;
    position: static;
    border: none;
    background-color: transparent;
    width: auto; /* Reset width for larger screens */
  }
`;

const NavItem = styled.li`
  margin: 0 1rem; /* Add space between menu items */
  text-align: left; /* Align text to the left */
  &:before {
    content: "• ";
    color: #333; /* Dot color */
  }

  @media(max-width: 768px) {
    margin: 0.5rem 1rem;
  }
`;

const NavLink = styled(Link)`
  color: #333; /* Dark color for contrast */
  text-decoration: none;

  &:hover {
    color: #000; /* Darker on hover */
  }
`;

const Hamburger = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  display: block;

  @media(min-width: 768px) {
    display: none;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const AuthLinks = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-left: 1rem;
    color: #333;
    text-decoration: none;

    &:hover {
      color: #000;
    }
  }
`;

function Header() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header>
      <Nav>
        <Menu>
          <Logo src={logo} alt="Logo" />
          <Hamburger onClick={() => setNavOpen(!navOpen)}>
            ☰
          </Hamburger>
          <NavList open={navOpen}>
            <NavItem><NavLink to="/">Home</NavLink></NavItem>
            <NavItem><NavLink to="/create">Create Lyrics</NavLink></NavItem>
            <NavItem><NavLink to="/about">About</NavLink></NavItem>
          </NavList>
        </Menu>
        <AuthLinks>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </AuthLinks>
      </Nav>
    </header>
  );
}

export default Header;