import styled from '@emotion/styled';
import { Github, Mail, Linkedin } from 'lucide-react';

const FooterContainer = styled.footer`
  background: ${props => props.isDark ? '#2d2d2d' : '#f8f9fa'};
  border-top: 1px solid ${props => props.isDark ? '#3a3a3a' : '#dee2e6'};
  padding: 3rem 1rem;
  margin-top: auto;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  color: ${props => props.isDark ? '#f0f0f0' : '#212529'};
`;

const Section = styled.div`
  h4 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: ${props => props.isDark ? '#0d6efd' : '#0066cc'};
  }

  p {
    color: ${props => props.isDark ? '#b0b0b0' : '#6c757d'};
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${props => props.isDark ? '#3a3a3a' : '#e9ecef'};
    color: ${props => props.isDark ? '#0d6efd' : '#0066cc'};
    transition: all 0.3s;

    &:hover {
      background: ${props => props.isDark ? '#0d6efd' : '#0066cc'};
      color: #fff;
    }
  }
`;

const Bottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.isDark ? '#3a3a3a' : '#dee2e6'};
  text-align: center;
  color: ${props => props.isDark ? '#b0b0b0' : '#6c757d'};
  font-size: 0.9rem;
`;

const Footer = ({ isDark }) => {
  return (
    <FooterContainer isDark={isDark}>
      <Content isDark={isDark}>
        <Section isDark={isDark}>
          <h4>About</h4>
          <p>
            A modern full-stack application built with Node.js, Express, React, PostgreSQL, and pgvector for AI capabilities.
          </p>
        </Section>

        <Section isDark={isDark}>
          <h4>Technology Stack</h4>
          <p>
            • Backend: Node.js, Express<br/>
            • Frontend: React, Mantine<br/>
            • Database: PostgreSQL, pgvector<br/>
            • Styling: Emotion
          </p>
        </Section>

        <Section isDark={isDark}>
          <h4>Connect</h4>
          <SocialLinks isDark={isDark}>
            <a href="https://github.com" title="GitHub" target="_blank" rel="noopener noreferrer">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" title="LinkedIn" target="_blank" rel="noopener noreferrer">
              <Linkedin size={20} />
            </a>
            <a href="mailto:hello@example.com" title="Email">
              <Mail size={20} />
            </a>
          </SocialLinks>
        </Section>
      </Content>

      <Bottom isDark={isDark}>
        <p>&copy; 2024 FullStack App. All rights reserved.</p>
      </Bottom>
    </FooterContainer>
  );
};

export default Footer;
