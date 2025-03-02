import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'react-feather';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(0, 118, 255, 0.1) 0%, rgba(0, 118, 255, 0.05) 100%);
`;

const AuthCard = styled(motion.div)`
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
  
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 2px 8px rgba(0, 118, 255, 0.3);
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const ToggleText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #666;

  span {
    color: #60efff;
    cursor: pointer;
    font-weight: bold;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  color: #00ff87;
  margin-top: 1rem;
`;

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        name: name || email.split('@')[0],
        email,
        avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${name || email}`
      };
      
      login(userData);
      setShowSuccess(true);
      
      // Redirect after showing success message
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 1000);
  };

  return (
    <Container>
      <AuthCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>{isLogin ? 'Welcome Back!' : 'Create Account'}</Title>
        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <InputGroup>
              <User size={20} />
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </InputGroup>
          )}
          <InputGroup>
            <Mail size={20} />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Lock size={20} />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <Button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={20} />
          </Button>
        </Form>
        
        <ToggleText>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </span>
        </ToggleText>

        <AnimatePresence>
          {showSuccess && (
            <SuccessMessage
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {isLogin ? 'Successfully signed in!' : 'Account created successfully!'}
            </SuccessMessage>
          )}
        </AnimatePresence>
      </AuthCard>
    </Container>
  );
}
