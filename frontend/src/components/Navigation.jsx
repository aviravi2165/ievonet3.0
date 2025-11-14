import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Menu, Moon, Sun, X } from 'lucide-react';

const Nav = styled.nav`
  background: ${props => props.isDark ? '#1e1e1e' : '#ffffff'};
  border-bottom: 1px solid ${props => props.isDark ? '#3a3a3a' : '#dee2e6'};
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.isDark ? '#0d6efd' : '#0066cc'};
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.isDark ? '#f0f0f0' : '#212529'};
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: ${props => props.isDark ? '#0d6efd' : '#0066cc'};
  }
`;

const ThemeButton = styled.button`
  background: none;
  border: 1px solid ${props => props.isDark ? '#3a3a3a' : '#dee2e6'};
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${props => props.isDark ? '#f0f0f0' : '#212529'};
  transition: all 0.3s;

  &:hover {
    background: ${props => props.isDark ? '#2d2d2d' : '#f8f9fa'};
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.isDark ? '#f0f0f0' : '#212529'};
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const DrawerToggleButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.isDark ? '#f0f0f0' : '#212529'};
  cursor: pointer;
  display: none;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background: ${props => props.isDark ? '#1e1e1e' : '#ffffff'};
  border-bottom: 1px solid ${props => props.isDark ? '#3a3a3a' : '#dee2e6'};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Navigation = ({ isDark, onThemeToggle, onMenuToggle }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Nav isDark={isDark}>
      <Container>
        <Logo to="/">
          🚀 FullStack App
        </Logo>

        <NavLinks>
          <DrawerToggleButton onClick={onMenuToggle} isDark={isDark}>
            <Menu size={20} />
          </DrawerToggleButton>
          <NavLink to="/">
            Home
          </NavLink>
          <NavLink to="/demo">
            Demo
          </NavLink>
          <NavLink to="/features">
            Features
          </NavLink>
          <NavLink to="/login">
            Login
          </NavLink>
          <ThemeButton onClick={onThemeToggle} isDark={isDark}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </ThemeButton>
        </NavLinks>

        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileMenuButton>

        {mobileMenuOpen && (
          <MobileMenu isDark={isDark}>
            <NavLink to="/">
              Home
            </NavLink>
            <NavLink to="/demo">
              Demo
            </NavLink>
            <NavLink to="/features">
              Features
            </NavLink>
            <NavLink to="/login">
              Login
            </NavLink>
            <ThemeButton onClick={onThemeToggle} isDark={isDark}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </ThemeButton>
          </MobileMenu>
        )}
      </Container>
    </Nav>
  );
};

export default Navigation;
