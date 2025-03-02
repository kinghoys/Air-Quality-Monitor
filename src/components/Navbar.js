import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { LogOut, User } from "react-feather";
import { useAuth } from "../context/AuthContext";

const Nav = styled(motion.nav)`
  position: sticky;
  top: 0;
  background: url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80") no-repeat center/cover;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  color: #ffffff;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
`;

const NavList = styled(motion.ul)`
  display: flex;
  gap: 1.5rem;
  list-style: none;
  align-items: center;
`;

const NavItem = styled(motion.li)`
  position: relative;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  font-size: 1rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  transition: color 0.3s ease;

  &:hover {
    color: #a0d6ff;
  }
`;

const UserSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid white;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const UserMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 1rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 1rem;
  min-width: 200px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;

const UserInfo = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;

  h4 {
    color: #333;
    margin: 0;
  }

  p {
    color: #666;
    font-size: 0.9rem;
    margin: 0.2rem 0 0 0;
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 5px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const AuthButton = styled(Link)`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 20px;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  color: white;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <Nav>
      <Logo>
        <StyledLink to="/">AQM</StyledLink>
      </Logo>
      <NavList>
        <NavItem>
          <StyledLink to="/">Home</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/dashboard">Dashboard</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/trends">Trends</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/alerts">Alerts</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/health-tips">Health Tips</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/how-it-works">How It Works</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/hospital-use">Hospital Use</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/about">About</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/contact">Contact</StyledLink>
        </NavItem>
        
        {isAuthenticated ? (
          <UserSection>
            <Avatar
              src={user.avatar}
              alt={user.name}
              onClick={() => setShowUserMenu(!showUserMenu)}
            />
            <AnimatePresence>
              {showUserMenu && (
                <UserMenu
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <UserInfo>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </UserInfo>
                  <MenuItem onClick={handleLogout}>
                    <LogOut /> Sign Out
                  </MenuItem>
                </UserMenu>
              )}
            </AnimatePresence>
          </UserSection>
        ) : (
          <NavItem>
            <AuthButton to="/auth">Sign In</AuthButton>
          </NavItem>
        )}
      </NavList>
    </Nav>
  );
}