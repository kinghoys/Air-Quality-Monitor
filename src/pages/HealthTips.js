import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const TipsSection = styled(motion.section)`
  min-height: 100vh;
  background: linear-gradient(135deg, #065f46 0%, #064e3b 100%);
  color: #ffffff;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const FloatingParticle = styled(motion.div)`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(120deg, #34d399 0%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: #d1fae5;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const QuestionnaireCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Question = styled.h3`
  color: #34d399;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const OptionButton = styled(motion.button)`
  background: ${props => props.selected ? 'rgba(52, 211, 153, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.selected ? '#34d399' : 'rgba(255, 255, 255, 0.2)'};
  color: #ffffff;
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(52, 211, 153, 0.1);
  }
`;

const RecommendationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const RecommendationCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  h3 {
    color: #34d399;
    margin-bottom: 1rem;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin: 1rem 0;
    padding-left: 1.5rem;
    position: relative;
    color: #d1fae5;
    
    &:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #34d399;
    }
  }
`;

const ProgressBar = styled(motion.div)`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin: 2rem 0;
  overflow: hidden;
  
  div {
    height: 100%;
    background: linear-gradient(90deg, #34d399, #10b981);
    border-radius: 3px;
  }
`;

const ActionButton = styled(motion.button)`
  background: linear-gradient(90deg, #34d399, #10b981);
  color: #ffffff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 2rem;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

function HealthTips({ darkMode }) {
  const [answers, setAnswers] = useState({
    activity: '',
    sensitivity: '',
    location: ''
  });
  
  const [showRecommendations, setShowRecommendations] = useState(false);

  const questions = {
    activity: {
      question: "What's your typical daily activity level?",
      options: ["Mostly Indoors", "Regular Outdoor Activities", "Athletic Training"]
    },
    sensitivity: {
      question: "Do you have any respiratory sensitivities?",
      options: ["None", "Mild", "Moderate", "Severe"]
    },
    location: {
      question: "Where do you spend most of your time?",
      options: ["Urban Area", "Suburban", "Rural", "Industrial Zone"]
    }
  };

  const handleAnswer = (question, answer) => {
    setAnswers(prev => ({
      ...prev,
      [question]: answer
    }));
  };

  const getProgress = () => {
    const answered = Object.values(answers).filter(a => a).length;
    return (answered / Object.keys(questions).length) * 100;
  };

  const getRecommendations = () => {
    const recommendations = [
      {
        title: "🌿 Personal Protection",
        tips: [
          answers.sensitivity === "Severe" ? "Always carry an N95 mask" : "Keep a mask handy for high pollution days",
          "Consider using air quality tracking apps",
          "Stay updated with local air quality alerts"
        ]
      },
      {
        title: "🏃 Activity Modifications",
        tips: [
          answers.activity === "Athletic Training" 
            ? "Schedule outdoor training during low pollution hours (early morning or evening)"
            : "Plan outdoor activities when air quality is best",
          "Have indoor alternatives ready",
          "Monitor breathing patterns during activities"
        ]
      },
      {
        title: "🏠 Indoor Air Quality",
        tips: [
          "Use HEPA air purifiers",
          "Regular ventilation during good air quality periods",
          "Keep indoor plants known for air purification"
        ]
      }
    ];

    if (answers.location === "Industrial Zone") {
      recommendations.push({
        title: "🏭 Special Considerations",
        tips: [
          "Use route planning to avoid high pollution areas",
          "Consider additional air quality monitors",
          "Create a clean air shelter at home"
        ]
      });
    }

    return recommendations;
  };

  return (
    <TipsSection
      id="health-tips"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {[...Array(20)].map((_, i) => (
        <FloatingParticle
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0]
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      <ContentWrapper>
        <Header>
          <Title>Personalized Health Advisory</Title>
          <Subtitle>
            Get tailored recommendations based on your lifestyle and environment
          </Subtitle>
        </Header>

        <AnimatePresence mode="wait">
          {!showRecommendations ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {Object.entries(questions).map(([key, { question, options }]) => (
                <QuestionnaireCard key={key}>
                  <Question>{question}</Question>
                  <OptionGrid>
                    {options.map(option => (
                      <OptionButton
                        key={option}
                        selected={answers[key] === option}
                        onClick={() => handleAnswer(key, option)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {option}
                      </OptionButton>
                    ))}
                  </OptionGrid>
                </QuestionnaireCard>
              ))}

              <ProgressBar>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgress()}%` }}
                  transition={{ duration: 0.5 }}
                />
              </ProgressBar>

              {getProgress() === 100 && (
                <ActionButton
                  onClick={() => setShowRecommendations(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Personalized Recommendations
                </ActionButton>
              )}
            </motion.div>
          ) : (
            <RecommendationsGrid>
              {getRecommendations().map((rec, index) => (
                <RecommendationCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3>{rec.title}</h3>
                  <ul>
                    {rec.tips.map((tip, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + i * 0.1 }}
                      >
                        {tip}
                      </motion.li>
                    ))}
                  </ul>
                </RecommendationCard>
              ))}
              
              <ActionButton
                onClick={() => setShowRecommendations(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Over
              </ActionButton>
            </RecommendationsGrid>
          )}
        </AnimatePresence>
      </ContentWrapper>
    </TipsSection>
  );
}

export default HealthTips;