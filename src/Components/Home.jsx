// src/components/Home.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../App.css'; // Ensure this path is correct

const HomeContainer = styled.div`
  text-align: center;
  padding-bottom: 2rem; /* Add padding to prevent footer overlap */
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  height: 100vh;
  color: white;
  text-align: center;
  background: url('/hero-image.jpg') no-repeat center center;
  background-size: cover;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.5); /* Dark overlay */
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin: 0.5rem 0 2rem; /* Increased bottom margin */
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.25rem;
  color: white;
  background-color: #28a745;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838; /* Custom hover color */
  }
`;

function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('.hero-section');
      hero.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <HomeContainer>
      <HeroSection className="hero-section">
        <Title>Welcome to Lyricai</Title>
        <Subtitle>Your AI-powered lyrics generator</Subtitle>
        <Button to="/create">Create Lyrics</Button>
      </HeroSection>
      <div>
        <p>Main content goes here.</p>
      </div>
    </HomeContainer>
  );
}

export default Home;