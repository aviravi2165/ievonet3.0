import { useState } from 'react';
import styled from '@emotion/styled';
import { Check, X, AlertCircle } from 'lucide-react';

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

const DemoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const DemoCard = styled.div`
  background: ${props => props.isDark ? '#2d2d2d' : '#ffffff'};
  border: 1px solid ${props => props.isDark ? '#3a3a3a' : '#dee2e6'};
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.isDark ? '0 8px 24px rgba(13, 110, 253, 0.15)' : '0 8px 24px rgba(0, 102, 204, 0.15)'};
  }

  h3 {
    font-size: 1.3rem;
    color: ${props => props.isDark ? '#f0f0f0' : '#212529'};
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const CodeBlock = styled.pre`
  background: ${props => props.isDark ? '#1e1e1e' : '#f8f9fa'};
  border: 1px solid ${props => props.isDark ? '#3a3a3a' : '#dee2e6'};
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  color: ${props => props.isDark ? '#00ff88' : '#333333'};
  font-size: 0.85rem;
  margin: 1rem 0;
`;

const StatusList = styled.ul`
  list-style: none;
  margin: 1rem 0;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    color: ${props => props.isDark ? '#b0b0b0' : '#6c757d'};

    svg {
      flex-shrink: 0;
    }
  }
`;

const ApiSection = styled.div`
  background: ${props => props.isDark ? '#2d2d2d' : '#f8f9fa'};
  border: 1px solid ${props => props.isDark ? '#3a3a3a' : '#dee2e6'};
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;

  h2 {
    font-size: 1.8rem;
    color: ${props => props.isDark ? '#f0f0f0' : '#212529'};
    margin-bottom: 1.5rem;
  }
`;

const ApiEndpoint = styled.div`
  background: ${props => props.isDark ? '#1e1e1e' : '#ffffff'};
  border: 1px solid ${props => props.isDark ? '#3a3a3a' : '#dee2e6'};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;

  .method {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-weight: bold;
    font-size: 0.85rem;
    margin-right: 0.5rem;

    &.get {
      background: #e3f2fd;
      color: #1976d2;
    }

    &.post {
      background: #f3e5f5;
      color: #7b1fa2;
    }
  }

  .endpoint {
    color: ${props => props.isDark ? '#00ff88' : '#333333'};
    font-family: monospace;
    margin-top: 0.5rem;
  }

  p {
    color: ${props => props.isDark ? '#b0b0b0' : '#6c757d'};
    margin-top: 0.5rem;
    font-size: 0.9rem;
  }
`;

const Demo = ({ isDark }) => {
  const [serverStatus, setServerStatus] = useState('checking');

  return (
    <Container>
      <Header isDark={isDark}>
        <h1>🎨 Demo & Showcase</h1>
        <p>Explore the features and capabilities of our full-stack application</p>
      </Header>

      <DemoGrid>
        <DemoCard isDark={isDark}>
          <h3>
            <Check size={24} color="#28a745" />
            Features Included
          </h3>
          <StatusList isDark={isDark}>
            <li>
              <Check size={18} color="#28a745" />
              Authentication (JWT)
            </li>
            <li>
              <Check size={18} color="#28a745" />
              User Management
            </li>
            <li>
              <Check size={18} color="#28a745" />
              PostgreSQL Database
            </li>
            <li>
              <Check size={18} color="#28a745" />
              pgvector AI Support
            </li>
            <li>
              <Check size={18} color="#28a745" />
              File Upload (Multer)
            </li>
            <li>
              <Check size={18} color="#28a745" />
              Logging (Winston)
            </li>
          </StatusList>
        </DemoCard>

        <DemoCard isDark={isDark}>
          <h3>
            <AlertCircle size={24} color="#ffc107" />
            Technologies
          </h3>
          <StatusList isDark={isDark}>
            <li>
              <Check size={18} color="#28a745" />
              Node.js / Express
            </li>
            <li>
              <Check size={18} color="#28a745" />
              React 18
            </li>
            <li>
              <Check size={18} color="#28a745" />
              Mantine Components
            </li>
            <li>
              <Check size={18} color="#28a745" />
              PostgreSQL & pgvector
            </li>
            <li>
              <Check size={18} color="#28a745" />
              Emotion Styling
            </li>
            <li>
              <Check size={18} color="#28a745" />
              Axios / Dayjs
            </li>
          </StatusList>
        </DemoCard>

        <DemoCard isDark={isDark}>
          <h3>
            <Check size={24} color="#28a745" />
            UI Features
          </h3>
          <StatusList isDark={isDark}>
            <li>
              <Check size={18} color="#28a745" />
              Light & Dark Theme
            </li>
            <li>
              <Check size={18} color="#28a745" />
              Responsive Design
            </li>
            <li>
              <Check size={18} color="#28a745" />
              Modern Components
            </li>
            <li>
              <Check size={18} color="#28a745" />
              Smooth Animations
            </li>
            <li>
              <Check size={18} color="#28a745" />
              Mobile Friendly
            </li>
            <li>
              <Check size={18} color="#28a745" />
              Accessible UI
            </li>
          </StatusList>
        </DemoCard>
      </DemoGrid>

      <ApiSection isDark={isDark}>
        <h2>API Endpoints</h2>

        <ApiEndpoint isDark={isDark}>
          <span className="method get">GET</span>
          <span className="endpoint">/api/health</span>
          <p>Check server health status</p>
        </ApiEndpoint>

        <ApiEndpoint isDark={isDark}>
          <span className="method post">POST</span>
          <span className="endpoint">/api/auth/register</span>
          <p>Register a new user</p>
          <CodeBlock isDark={isDark}>
{`{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}`}
          </CodeBlock>
        </ApiEndpoint>

        <ApiEndpoint isDark={isDark}>
          <span className="method post">POST</span>
          <span className="endpoint">/api/auth/login</span>
          <p>Login user and get JWT token</p>
          <CodeBlock isDark={isDark}>
{`{
  "email": "user@example.com",
  "password": "password123"
}`}
          </CodeBlock>
        </ApiEndpoint>

        <ApiEndpoint isDark={isDark}>
          <span className="method get">GET</span>
          <span className="endpoint">/api/auth/profile</span>
          <p>Get current user profile (requires authentication)</p>
          <CodeBlock isDark={isDark}>
{`Headers:
Authorization: Bearer <your_jwt_token>`}
          </CodeBlock>
        </ApiEndpoint>
      </ApiSection>
    </Container>
  );
};

export default Demo;
