import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const SplashContainer = styled(motion.div)`
  height: 100vh;
  background: url("https://images.unsplash.com/photo-1497436072909-60f69c697856?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80") no-repeat center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

function Splash({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <SplashContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Title
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Air Quality Monitor
      </Title>
    </SplashContainer>
  );
}

export default Splash;