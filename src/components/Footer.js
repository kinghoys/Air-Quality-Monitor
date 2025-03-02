import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const FooterStyled = styled(motion.footer)`
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  padding: 1rem;
  text-align: center;
  position: relative;
  bottom: 0;
  width: 100%;
`;

function Footer() {
  return (
    <FooterStyled
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <p>&copy; 2025 Air Quality Monitor. All rights reserved.</p>
      <p>
        <a href="#about" style={{ color: "#a0d6ff", textDecoration: "none" }}>About</a> | 
        <a href="#contact" style={{ color: "#a0d6ff", textDecoration: "none" }}>Contact</a>
      </p>
    </FooterStyled>
  );
}

export default Footer;