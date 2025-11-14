import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import GlobalStyles from './styles/GlobalStyles.jsx';
import { useTheme } from './hooks/useTheme';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Demo from './pages/Demo';
import Features from './pages/Features';
import Login from './pages/Login';

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.isDark ? '#1e1e1e' : '#ffffff'};
  color: ${props => props.isDark ? '#f0f0f0' : '#212529'};
  display: flex;
  flex-direction: column;
  transition: background 0.3s, color 0.3s;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
`;

function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Router>
      <GlobalStyles />
      <AppContainer isDark={isDark}>
        <Navigation isDark={isDark} onThemeToggle={toggleTheme} />
        <Main>
          <Routes>
            <Route path="/" element={<Home isDark={isDark} />} />
            <Route path="/demo" element={<Demo isDark={isDark} />} />
            <Route path="/features" element={<Features isDark={isDark} />} />
            <Route path="/login" element={<Login isDark={isDark} />} />
          </Routes>
        </Main>
        <Footer isDark={isDark} />
      </AppContainer>
    </Router>
  );
}

export default App;
