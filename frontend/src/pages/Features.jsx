import styled from '@emotion/styled';
import { Code2, Database, Shield, Zap, User, FileText } from 'lucide-react';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 200px);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    color: ${props => props.isDark ? '#f0f0f0' : '#212529'};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    color: ${props => props.isDark ? '#b0b0b0' : '#6c757d'};
  }
`;

const FeatureSection = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${props => props.isDark ? '#f0f0f0' : '#212529'};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${props => props.isDark ? '#0d6efd' : '#0066cc'};
  }
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const FeatureItem = styled.div`
  background: ${props => props.isDark ? '#2d2d2d' : '#ffffff'};
  border: 1px solid ${props => props.isDark ? '#3a3a3a' : '#dee2e6'};
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.isDark ? '0 8px 24px rgba(13, 110, 253, 0.15)' : '0 8px 24px rgba(0, 102, 204, 0.15)'};
    border-color: ${props => props.isDark ? '#0d6efd' : '#0066cc'};
  }

  h4 {
    font-size: 1.1rem;
    color: ${props => props.isDark ? '#f0f0f0' : '#212529'};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${props => props.isDark ? '#b0b0b0' : '#6c757d'};
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

const CodeExample = styled.pre`
  background: ${props => props.isDark ? '#1e1e1e' : '#f8f9fa'};
  border: 1px solid ${props => props.isDark ? '#3a3a3a' : '#dee2e6'};
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  color: ${props => props.isDark ? '#00ff88' : '#333333'};
  font-size: 0.85rem;
  margin: 1rem 0;
`;

const Features = ({ isDark }) => {
  return (
    <Container>
      <Header isDark={isDark}>
        <h1>🎯 Features & Capabilities</h1>
        <p>Everything you need for a modern full-stack application</p>
      </Header>

      <FeatureSection>
        <SectionTitle isDark={isDark}>
          <Code2 size={24} />
          Backend Features
        </SectionTitle>
        <FeatureList>
          <FeatureItem isDark={isDark}>
            <h4>Express.js</h4>
            <p>Fast, unopinionated web framework for Node.js with middleware support.</p>
          </FeatureItem>
          <FeatureItem isDark={isDark}>
            <h4>JWT Authentication</h4>
            <p>Secure token-based authentication with bcrypt password hashing.</p>
          </FeatureItem>
          <FeatureItem isDark={isDark}>
            <h4>PostgreSQL</h4>
            <p>Reliable relational database with advanced features and pgvector extension.</p>
          </FeatureItem>
          <FeatureItem isDark={isDark}>
            <h4>pgvector</h4>
            <p>AI/ML ready with vector embeddings for similarity search and embeddings storage.</p>
          </FeatureItem>
          <FeatureItem isDark={isDark}>
            <h4>Multer</h4>
            <p>File upload middleware with validation and storage configuration.</p>
          </FeatureItem>
          <FeatureItem isDark={isDark}>
            <h4>Winston Logging</h4>
            <p>Comprehensive logging system with multiple transports and log levels.</p>
          </FeatureItem>
        </FeatureList>
      </FeatureSection>

      <FeatureSection>
        <SectionTitle isDark={isDark}>
          <Code2 size={24} />
          Frontend Features
        </SectionTitle>
        <FeatureList>
          <FeatureItem isDark={isDark}>
            <h4>React 18</h4>
            <p>Latest React with hooks, concurrent rendering, and automatic batching.</p>
          </FeatureItem>
          <FeatureItem isDark={isDark}>
            <h4>Mantine Components</h4>
            <p>Rich component library with built-in styling and accessibility features.</p>
          </FeatureItem>
          <FeatureItem isDark={isDark}>
            <h4>Emotion Styling</h4>
            <p>CSS-in-JS library for component-scoped styles and dynamic theming.</p>
          </FeatureItem>
          <FeatureItem isDark={isDark}>
            <h4>Light & Dark Theme</h4>
            <p>Seamless theme switching with localStorage persistence and system preference detection.</p>
          </FeatureItem>
          <FeatureItem isDark={isDark}>
            <h4>Axios</h4>
            <p>Promise-based HTTP client with interceptors and request/response handling.</p>
          </FeatureItem>
          <FeatureItem isDark={isDark}>
            <h4>Dayjs</h4>
            <p>Lightweight date manipulation library for formatting and parsing dates.</p>
          </FeatureItem>
        </FeatureList>
      </FeatureSection>

      <FeatureSection>
        <SectionTitle isDark={isDark}>
          <Database size={24} />
          Database & Architecture
        </SectionTitle>
        <FeatureList>
          <FeatureItem isDark={isDark}>
            <h4>Schema Management</h4>
            <p>Well-organized database schemas with proper relationships and constraints.</p>
          </FeatureItem>
          <FeatureItem isDark={isDark}>
            <h4>Database Migrations</h4>
            <p>Version-controlled schema changes for consistent deployments across environments.</p>
          </FeatureItem>
          <FeatureItem isDark={isDark}>
            <h4>Data Seeding</h4>
            <p>Sample data population for development and testing environments.</p>
          </FeatureItem>
          <FeatureItem isDark={isDark}>
            <h4>Backup & Recovery</h4>
            <p>Database backup strategies and recovery procedures documentation.</p>
          </FeatureItem>
        </FeatureList>
      </FeatureSection>

      <FeatureSection>
        <SectionTitle isDark={isDark}>
          <Shield size={24} />
          Security Features
        </SectionTitle>
        <FeatureList>
          <FeatureItem isDark={isDark}>
            <h4>Bcrypt Hashing</h4>
            <p>Industry-standard password hashing with salt rounds for secure storage.</p>
          </FeatureItem>
          <FeatureItem isDark={isDark}>
            <h4>JWT Tokens</h4>
            <p>Secure token-based authentication with expiration and refresh capabilities.</p>
          </FeatureItem>
          <FeatureItem isDark={isDark}>
            <h4>CORS Enabled</h4>
            <p>Cross-Origin Resource Sharing configured for secure API access.</p>
          </FeatureItem>
          <FeatureItem isDark={isDark}>
            <h4>Input Validation</h4>
            <p>Express-validator for request validation and sanitization.</p>
          </FeatureItem>
        </FeatureList>
      </FeatureSection>

      <FeatureSection>
        <SectionTitle isDark={isDark}>
          <Zap size={24} />
          Performance & Testing
        </SectionTitle>
        <FeatureList>
          <FeatureItem isDark={isDark}>
            <h4>Jest Testing</h4>
            <p>Comprehensive testing framework for unit and integration tests.</p>
          </FeatureItem>
          <FeatureItem isDark={isDark}>
            <h4>Async Operations</h4>
            <p>Efficient handling of async/await for database operations and API calls.</p>
          </FeatureItem>
          <FeatureItem isDark={isDark}>
            <h4>Error Handling</h4>
            <p>Centralized error handling middleware with proper HTTP status codes.</p>
          </FeatureItem>
          <FeatureItem isDark={isDark}>
            <h4>Optimization</h4>
            <p>Production-ready optimization for both frontend and backend performance.</p>
          </FeatureItem>
        </FeatureList>
      </FeatureSection>

      <FeatureSection>
        <SectionTitle isDark={isDark}>
          <User size={24} />
          User Management System
        </SectionTitle>
        <FeatureItem isDark={isDark}>
          <h4>Authentication Flow</h4>
          <p>Complete user registration, login, and profile management system:</p>
          <CodeExample isDark={isDark}>
{`Registration: POST /api/auth/register
Login:        POST /api/auth/login
Profile:      GET  /api/auth/profile

Request:
{
  "email": "user@example.com",
  "password": "secure_password",
  "name": "John Doe"
}

Response:
{
  "message": "Success",
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}`}
          </CodeExample>
        </FeatureItem>
      </FeatureSection>
    </Container>
  );
};

export default Features;
