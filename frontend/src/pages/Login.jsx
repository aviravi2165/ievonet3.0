import { useState } from 'react';
import styled from '@emotion/styled';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Container = styled.div`
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, ${props => props.isDark ? '#1e1e1e' : '#ffffff'}, ${props => props.isDark ? '#2d2d2d' : '#f8f9fa'});
`;

const LoginBox = styled.div`
  background: ${props => props.isDark ? '#2d2d2d' : '#ffffff'};
  border: 1px solid ${props => props.isDark ? '#3a3a3a' : '#dee2e6'};
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: ${props => props.isDark ? '0 8px 24px rgba(0, 0, 0, 0.4)' : '0 8px 24px rgba(0, 0, 0, 0.1)'};
`;

const Title = styled.h1`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 0.5rem;
  color: ${props => props.isDark ? '#f0f0f0' : '#212529'};
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${props => props.isDark ? '#b0b0b0' : '#6c757d'};
  margin-bottom: 2rem;
  font-size: 0.95rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.isDark ? '#f0f0f0' : '#212529'};
  font-weight: 500;
  font-size: 0.95rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 1rem;
    color: ${props => props.isDark ? '#0d6efd' : '#0066cc'};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 1px solid ${props => props.isDark ? '#3a3a3a' : '#dee2e6'};
  border-radius: 8px;
  font-size: 1rem;
  background: ${props => props.isDark ? '#1e1e1e' : '#f8f9fa'};
  color: ${props => props.isDark ? '#f0f0f0' : '#212529'};
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: ${props => props.isDark ? '#0d6efd' : '#0066cc'};
    box-shadow: 0 0 0 3px ${props => props.isDark ? 'rgba(13, 110, 253, 0.1)' : 'rgba(0, 102, 204, 0.1)'};
  }

  &::placeholder {
    color: ${props => props.isDark ? '#666666' : '#aaaaaa'};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #0066cc, #0052a3);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 102, 204, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: ${props => props.isDark ? '#666666' : '#ddd'};

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => props.isDark ? '#3a3a3a' : '#dee2e6'};
  }

  span {
    margin: 0 1rem;
    color: ${props => props.isDark ? '#b0b0b0' : '#6c757d'};
    font-size: 0.9rem;
  }
`;

const SignupLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: ${props => props.isDark ? '#b0b0b0' : '#6c757d'};
  font-size: 0.95rem;

  a {
    color: ${props => props.isDark ? '#0d6efd' : '#0066cc'};
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Message = styled.div`
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  
  ${props => props.type === 'info' && `
    background: #cfe2ff;
    color: #084298;
    border: 1px solid #b6d4fe;
  `}
`;

const Login = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  return (
    <Container isDark={isDark}>
      <LoginBox isDark={isDark}>
        {activeTab === 'login' ? (
          <>
            <Title isDark={isDark}>Login</Title>
            <Subtitle isDark={isDark}>Sign in to your account</Subtitle>
            
            <Message type="info">
              📝 Demo credentials available. Use any email/password to test the UI.
            </Message>

            <FormGroup>
              <Label isDark={isDark}>Email</Label>
              <InputWrapper>
                <Mail size={20} />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isDark={isDark}
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label isDark={isDark}>Password</Label>
              <InputWrapper>
                <Lock size={20} />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isDark={isDark}
                />
              </InputWrapper>
            </FormGroup>

            <Button>
              <LogIn size={20} />
              Sign In
            </Button>

            <Divider isDark={isDark}>
              <span>or</span>
            </Divider>

            <SignupLink isDark={isDark}>
              Don't have an account?{' '}
              <button
                onClick={() => {
                  setActiveTab('register');
                  setEmail('');
                  setPassword('');
                  setName('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: isDark ? '#0d6efd' : '#0066cc',
                  fontWeight: 600,
                  textDecoration: 'underline',
                }}
              >
                Sign up here
              </button>
            </SignupLink>
          </>
        ) : (
          <>
            <Title isDark={isDark}>Register</Title>
            <Subtitle isDark={isDark}>Create a new account</Subtitle>

            <Message type="info">
              📝 Demo registration. Fill in the form to create an account.
            </Message>

            <FormGroup>
              <Label isDark={isDark}>Name</Label>
              <InputWrapper>
                <UserPlus size={20} />
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isDark={isDark}
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label isDark={isDark}>Email</Label>
              <InputWrapper>
                <Mail size={20} />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isDark={isDark}
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label isDark={isDark}>Password</Label>
              <InputWrapper>
                <Lock size={20} />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isDark={isDark}
                />
              </InputWrapper>
            </FormGroup>

            <Button>
              <UserPlus size={20} />
              Create Account
            </Button>

            <Divider isDark={isDark}>
              <span>or</span>
            </Divider>

            <SignupLink isDark={isDark}>
              Already have an account?{' '}
              <button
                onClick={() => {
                  setActiveTab('login');
                  setEmail('');
                  setPassword('');
                  setName('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: isDark ? '#0d6efd' : '#0066cc',
                  fontWeight: 600,
                  textDecoration: 'underline',
                }}
              >
                Sign in here
              </button>
            </SignupLink>
          </>
        )}
      </LoginBox>
    </Container>
  );
};

export default Login;
