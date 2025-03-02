import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { 
  CloudRain, 
  Database, 
  Cpu, 
  Bell, 
  Shield, 
  TrendingUp,
  Smartphone,
  Map,
  RefreshCw,
  AlertTriangle,
  Heart,
  Zap
} from "react-feather";

const Section = styled(motion.section)`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
  color: #ffffff;
  padding: 4rem 2rem;
  overflow: hidden;
  position: relative;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(120deg, #90caf9 0%, #42a5f5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: #90caf9;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const StepCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  .step-number {
    font-size: 1rem;
    color: #90caf9;
    font-weight: 500;
  }
  
  .step-title {
    font-size: 1.4rem;
    color: #e3f2fd;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    svg {
      color: #42a5f5;
    }
  }
  
  .step-description {
    color: #90caf9;
    line-height: 1.6;
  }
  
  .features {
    margin-top: 1rem;
    
    .feature {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0.75rem 0;
      color: #e3f2fd;
      font-size: 0.9rem;
      
      svg {
        color: #42a5f5;
        width: 16px;
        height: 16px;
      }
    }
  }
`;

const ProcessFlow = styled(motion.div)`
  margin: 4rem 0;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const FlowTitle = styled.h3`
  font-size: 1.8rem;
  color: #e3f2fd;
  text-align: center;
  margin-bottom: 2rem;
`;

const FlowSteps = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FlowStep = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  flex: 1;
  
  .icon-container {
    width: 60px;
    height: 60px;
    background: rgba(66, 165, 245, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      color: #42a5f5;
    }
  }
  
  .step-name {
    color: #e3f2fd;
    font-weight: 500;
  }
`;

const Arrow = styled(motion.div)`
  width: 60px;
  height: 2px;
  background: #42a5f5;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-top: 2px solid #42a5f5;
    border-right: 2px solid #42a5f5;
    transform: rotate(45deg);
  }
  
  @media (max-width: 768px) {
    transform: rotate(90deg);
    margin: 1rem 0;
  }
`;

function HowItWorks({ darkMode }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const flowStepVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <Section
      id="how-it-works"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <ContentWrapper>
        <Header>
          <Title>How It Works</Title>
          <Subtitle>
            Discover how our advanced air quality monitoring system helps keep you informed and healthy
          </Subtitle>
        </Header>

        <StepsGrid>
          <StepCard
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.1 }}
          >
            <span className="step-number">01</span>
            <h3 className="step-title">
              <CloudRain size={24} />
              Data Collection
            </h3>
            <p className="step-description">
              Our network of high-precision sensors continuously monitors air quality parameters across the city
            </p>
            <div className="features">
              <div className="feature">
                <Zap /> Real-time monitoring
              </div>
              <div className="feature">
                <Map /> Wide coverage area
              </div>
              <div className="feature">
                <Shield /> Calibrated sensors
              </div>
            </div>
          </StepCard>

          <StepCard
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.2 }}
          >
            <span className="step-number">02</span>
            <h3 className="step-title">
              <Cpu size={24} />
              Data Processing
            </h3>
            <p className="step-description">
              Advanced AI algorithms analyze the collected data to identify patterns and predict air quality trends
            </p>
            <div className="features">
              <div className="feature">
                <Database /> Big data analysis
              </div>
              <div className="feature">
                <TrendingUp /> Pattern recognition
              </div>
              <div className="feature">
                <RefreshCw /> Real-time updates
              </div>
            </div>
          </StepCard>

          <StepCard
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.3 }}
          >
            <span className="step-number">03</span>
            <h3 className="step-title">
              <Bell size={24} />
              Smart Notifications
            </h3>
            <p className="step-description">
              Get personalized alerts and recommendations based on real-time air quality conditions
            </p>
            <div className="features">
              <div className="feature">
                <AlertTriangle /> Timely alerts
              </div>
              <div className="feature">
                <Heart /> Health recommendations
              </div>
              <div className="feature">
                <Smartphone /> Mobile notifications
              </div>
            </div>
          </StepCard>
        </StepsGrid>

        <ProcessFlow
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FlowTitle>The Process</FlowTitle>
          <FlowSteps>
            <FlowStep variants={flowStepVariants}>
              <motion.div 
                className="icon-container"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <CloudRain size={24} />
              </motion.div>
              <span className="step-name">Data Collection</span>
            </FlowStep>
            
            <Arrow />
            
            <FlowStep variants={flowStepVariants}>
              <motion.div 
                className="icon-container"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Database size={24} />
              </motion.div>
              <span className="step-name">Storage</span>
            </FlowStep>
            
            <Arrow />
            
            <FlowStep variants={flowStepVariants}>
              <motion.div 
                className="icon-container"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Cpu size={24} />
              </motion.div>
              <span className="step-name">Analysis</span>
            </FlowStep>
            
            <Arrow />
            
            <FlowStep variants={flowStepVariants}>
              <motion.div 
                className="icon-container"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell size={24} />
              </motion.div>
              <span className="step-name">Notification</span>
            </FlowStep>
          </FlowSteps>
        </ProcessFlow>
      </ContentWrapper>
    </Section>
  );
}

export default HowItWorks;