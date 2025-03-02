import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Mail, MapPin, Phone } from "react-feather";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ContactSection = styled.section`
  margin: 4rem 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ContactCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;

  svg {
    color: white;
    width: 30px;
    height: 30px;
  }
`;

const ContactForm = styled.form`
  margin-top: 3rem;
  display: grid;
  gap: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  color: #333;
  font-size: 1rem;

  &:focus {
    outline: 2px solid #60efff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  color: #333;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: 2px solid #60efff;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export default function About() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <Container>
      <ContactSection>
        <Title>Get in Touch</Title>
        <ContactGrid>
          <ContactCard
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <IconWrapper>
              <MapPin />
            </IconWrapper>
            <h3>Visit Us</h3>
            <p>123 Air Quality Street</p>
            <p>Silicon Valley, CA 94025</p>
          </ContactCard>

          <ContactCard
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <IconWrapper>
              <Mail />
            </IconWrapper>
            <h3>Email Us</h3>
            <p>info@airqualitymonitor.com</p>
            <p>support@airqualitymonitor.com</p>
          </ContactCard>

          <ContactCard
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <IconWrapper>
              <Phone />
            </IconWrapper>
            <h3>Call Us</h3>
            <p>+1 (555) 123-4567</p>
            <p>Mon - Fri, 9am - 6pm PST</p>
          </ContactCard>
        </ContactGrid>

        <ContactForm onSubmit={handleSubmit}>
          <Input type="text" placeholder="Your Name" required />
          <Input type="email" placeholder="Your Email" required />
          <Input type="text" placeholder="Subject" required />
          <TextArea placeholder="Your Message" required />
          <Button type="submit">Send Message</Button>
        </ContactForm>
      </ContactSection>
    </Container>
  );
}