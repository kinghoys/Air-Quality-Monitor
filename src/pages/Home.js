import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const HomeSection = styled(motion.section)`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1f35 0%, #2d3663 100%);
  color: #ffffff;
  overflow-x: hidden;
`;

const HeroSection = styled(motion.div)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80") no-repeat center/cover;
    opacity: 0.2;
    z-index: 0;
  }
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const Logo = styled(motion.div)`
  font-size: 4rem;
  font-weight: bold;
  background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  z-index: 1;
`;

const WelcomeText = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  z-index: 1;
  
  span {
    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  text-align: center;
  color: #a0aec0;
  margin-bottom: 3rem;
  max-width: 600px;
  z-index: 1;
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
`;

const StatCard = styled(GlassCard)`
  text-align: center;
  transition: transform 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 1rem 0;
  background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: #a0aec0;
`;

const FeaturesSection = styled.div`
  padding: 6rem 2rem;
  background: rgba(0, 0, 0, 0.2);
`;

const FeatureGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  
  h3 {
    font-size: 1.5rem;
    margin: 1rem 0;
    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    color: #a0aec0;
    line-height: 1.6;
  }
`;

const ActionButton = styled(motion.button)`
  background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  color: #1a1f35;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const LiveDataSection = styled.div`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ChartContainer = styled(GlassCard)`
  padding: 2rem;
  margin-top: 2rem;
  height: 400px;
`;

function Home() {
  const [currentAQI, setCurrentAQI] = useState(42);
  const [chartData, setChartData] = useState({
    labels: ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
    datasets: [{
      label: 'Air Quality Index',
      data: [35, 40, 38, 45, 42, 50, 45, 42],
      borderColor: '#84fab0',
      tension: 0.4,
      fill: true,
      backgroundColor: 'rgba(132, 250, 176, 0.1)'
    }]
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setCurrentAQI(prev => {
        const newValue = prev + (Math.random() * 2 - 1);
        return Math.round(Math.max(0, Math.min(100, newValue)));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#a0aec0'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#a0aec0'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      }
    }
  };

  return (
    <HomeSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      id="home"
    >
      <HeroSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Logo
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          AQM
        </Logo>
        <WelcomeText
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Breathe <span>Smarter</span>, Live Better
        </WelcomeText>
        <Subtitle
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Real-time air quality monitoring with advanced analytics and personalized health recommendations
        </Subtitle>
        <ActionButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="#dashboard" style={{ color: "inherit", textDecoration: "none" }}>
            Explore Dashboard
          </a>
        </ActionButton>
      </HeroSection>

      <StatsGrid
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <StatCard>
          <StatValue>{currentAQI}</StatValue>
          <StatLabel>Current AQI</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>24/7</StatValue>
          <StatLabel>Real-time Monitoring</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>98%</StatValue>
          <StatLabel>Accuracy Rate</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>5M+</StatValue>
          <StatLabel>Data Points Analyzed</StatLabel>
        </StatCard>
      </StatsGrid>

      <LiveDataSection>
        <ChartContainer>
          <Line data={chartData} options={chartOptions} />
        </ChartContainer>
      </LiveDataSection>

      <FeaturesSection>
        <FeatureGrid
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <FeatureCard>
            <h3>Real-time Monitoring</h3>
            <p>Get instant updates on air quality parameters with our advanced sensor network</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Health Insights</h3>
            <p>Receive personalized health recommendations based on current air quality conditions</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Predictive Analytics</h3>
            <p>Stay ahead with AI-powered forecasts and trend analysis</p>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>
    </HomeSection>
  );
}

export default Home;