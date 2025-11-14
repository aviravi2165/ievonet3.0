import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { ArrowRight, Database, Zap, Shield, Boxes } from 'lucide-react';

const Container = styled.div`
  min-height: calc(100vh - 200px);
`;

const Hero = styled.section`
  background: linear-gradient(135deg, ${props => props.isDark ? '#1e1e1e' : '#ffffff'}, ${props => props.isDark ? '#2d2d2d' : '#f8f9fa'});
  padding: 6rem 2rem;
  text-align: center;
  color: ${props => props.isDark ? '#f0f0f0' : '#212529'};

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #0066cc, #00d4ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.3rem;
    color: ${props => props.isDark ? '#b0b0b0' : '#6c757d'};
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const CTA = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  a, button {
    padding: 0.75rem 2rem;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    transition: all 0.3s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    cursor: pointer;
    border: none;
  }
`;

const PrimaryButton = styled(Link)`
  background: linear-gradient(135deg, #0066cc, #0052a3);
  color: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 102, 204, 0.3);
  }
`;

const SecondaryButton = styled(Link)`
  background: ${props => props.isDark ? '#3a3a3a' : '#e9ecef'};
  color: ${props => props.isDark ? '#f0f0f0' : '#212529'};
  border: 2px solid ${props => props.isDark ? '#0d6efd' : '#0066cc'};

  &:hover {
    background: ${props => props.isDark ? '#0d6efd' : '#0066cc'};
    color: white;
  }
`;

const Features = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;

  h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    color: ${props => props.isDark ? '#f0f0f0' : '#212529'};
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: ${props => props.isDark ? '#2d2d2d' : '#ffffff'};
  border: 1px solid ${props => props.isDark ? '#3a3a3a' : '#dee2e6'};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.isDark ? '0 8px 24px rgba(13, 110, 253, 0.15)' : '0 8px 24px rgba(0, 102, 204, 0.15)'};
    border-color: ${props => props.isDark ? '#0d6efd' : '#0066cc'};
  }

  svg {
    width: 3rem;
    height: 3rem;
    color: ${props => props.isDark ? '#0d6efd' : '#0066cc'};
    margin: 0 auto 1rem;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    color: ${props => props.isDark ? '#f0f0f0' : '#212529'};
  }

  p {
    color: ${props => props.isDark ? '#b0b0b0' : '#6c757d'};
    line-height: 1.6;
  }
`;

const Home = ({ isDark }) => {
  return (
    <Container>
      <Hero isDark={isDark}>
        <h1>🚀 Welcome to FullStack App</h1>
        <p>
          A modern, full-featured application built with cutting-edge technologies.
          <br />
          Experience the power of Node.js, React, and PostgreSQL combined.
        </p>
        <CTA>
          <PrimaryButton to="/demo">
            Explore Demo <ArrowRight size={20} />
          </PrimaryButton>
          <SecondaryButton to="/features">
            Learn More
          </SecondaryButton>
        </CTA>
      </Hero>

      <Features isDark={isDark}>
        <h2>Key Features</h2>
        <FeatureGrid>
          <FeatureCard isDark={isDark}>
            <Zap />
            <h3>Lightning Fast</h3>
            <p>Optimized performance with modern technologies and efficient architecture.</p>
          </FeatureCard>

          <FeatureCard isDark={isDark}>
            <Shield />
            <h3>Secure</h3>
            <p>Built with authentication, authorization, and security best practices.</p>
          </FeatureCard>

          <FeatureCard isDark={isDark}>
            <Database />
            <h3>AI-Ready</h3>
            <p>PostgreSQL with pgvector support for AI and machine learning capabilities.</p>
          </FeatureCard>

          <FeatureCard isDark={isDark}>
            <Boxes />
            <h3>Modular</h3>
            <p>Clean, organized structure with separate backend, frontend, and database layers.</p>
          </FeatureCard>
        </FeatureGrid>
      </Features>
    </Container>
  );
};

export default Home;
