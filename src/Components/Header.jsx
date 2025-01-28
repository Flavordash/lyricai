import React from 'react';
import styled from 'styled-components';
import logo from './logo1.png';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center; 
  height: 90px;
  background-color: #f8f9fa; 
  padding: 0 20px; 
  position: relative; 
`;

const Logo = styled.img`
  height: 100px; 
  width: auto; 
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 0.5rem; 
  position: absolute; 
  right: 20px; 
`;

const SignInButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: white; 
  color: black; 
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #f0f0f0; 
`;

const RegisterButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: black; 
  color: white;
  border: 1px solid black; 
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #333; 
  }
`;

function Header() {
  return (
    <HeaderContainer>
   
      <Logo src={logo} alt="Logo" />

      <AuthButtons>
        <SignInButton onClick={() => console.log('Sign In Clicked')}>Sign In</SignInButton>
        <RegisterButton onClick={() => console.log('Register Clicked')}>Register</RegisterButton>
      </AuthButtons>
    </HeaderContainer>
  );
}

export default Header;