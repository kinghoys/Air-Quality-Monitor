import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { MapPin, Wind, Activity, Database, TrendingUp, Shield } from "react-feather";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.section`
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

const Subtitle = styled.h2`
  font-size: 1.8rem;
  margin: 3rem 0 2rem;
  color: #2c3e50;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #34495e;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h3 {
    font-size: 1.3rem;
    margin: 1rem 0;
    color: #2c3e50;
  }

  p {
    color: #34495e;
    line-height: 1.6;
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
  margin-bottom: 1rem;

  svg {
    color: white;
    width: 30px;
    height: 30px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: #34495e;
    font-size: 1.1rem;
  }
`;

export default function About() {
  const features = [
    {
      icon: <MapPin />,
      title: "Mobile Sensors",
      description: "Dynamic air quality data collection through sensors mounted on buses, taxis, and trains, providing comprehensive coverage across the city."
    },
    {
      icon: <Wind />,
      title: "Fixed Monitoring",
      description: "Continuous monitoring through smart streetlight-mounted sensors in high-traffic areas and residential zones for consistent data collection."
    },
    {
      icon: <Activity />,
      title: "Healthcare Integration",
      description: "Direct integration with healthcare facilities to assess pollution risks and optimize patient care based on real-time air quality data."
    },
    {
      icon: <Database />,
      title: "Real-time Analytics",
      description: "Advanced data processing and machine learning algorithms to provide accurate, real-time insights and predictions."
    },
    {
      icon: <Shield />,
      title: "Policy Support",
      description: "Empowering government officials with data-driven insights for effective pollution control and urban planning decisions."
    },
    {
      icon: <TrendingUp />,
      title: "Predictive Insights",
      description: "Future air quality predictions and trend analysis to help stakeholders make proactive decisions."
    }
  ];

  const stats = [
    { number: "24/7", text: "Real-time Monitoring" },
    { number: "95%", text: "City Coverage" },
    { number: "500+", text: "Active Sensors" },
    { number: "1M+", text: "Daily Data Points" }
  ];

  return (
    <Container>
      <Section>
        <Title>About Our Air Quality Monitoring System</Title>
        <Description>
          Our cutting-edge air quality monitoring system employs a hybrid approach,
          combining mobile and fixed sensors to provide comprehensive pollution tracking
          across urban environments. This innovative solution ensures accurate,
          real-time data collection and analysis for better environmental health decisions.
        </Description>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <IconWrapper>{feature.icon}</IconWrapper>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </FeatureCard>
          ))}
        </FeaturesGrid>

        <Subtitle>Impact in Numbers</Subtitle>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3>{stat.number}</h3>
              <p>{stat.text}</p>
            </StatCard>
          ))}
        </StatsGrid>
      </Section>
    </Container>
  );
}