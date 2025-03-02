import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Line, Radar, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const TrendsSection = styled(motion.section)`
  min-height: 100vh;
  background: #0f172a;
  color: #ffffff;
  padding: 2rem;
`;

const TrendsHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const TrendsTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(120deg, #6366f1 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 20px;
  background: ${props => props.active ? 'linear-gradient(120deg, #6366f1 0%, #a855f7 100%)' : 'rgba(255, 255, 255, 0.1)'};
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  height: ${props => props.height || 'auto'};
`;

const InsightCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #a855f7;
  }
`;

const PatternList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 10px;
    
    .icon {
      margin-right: 1rem;
      color: #6366f1;
    }
    
    .pattern-text {
      color: #cbd5e1;
    }
    
    .percentage {
      margin-left: auto;
      font-weight: bold;
      color: #6366f1;
    }
  }
`;

const ComparisonCard = styled(ChartCard)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const ComparisonItem = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  
  .label {
    color: #94a3b8;
    margin-bottom: 0.5rem;
  }
  
  .value {
    font-size: 2rem;
    font-weight: bold;
    background: linear-gradient(120deg, #6366f1 0%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .change {
    color: ${props => props.trend > 0 ? '#4ade80' : '#f43f5e'};
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
`;

function Trends({ darkMode }) {
  const [activeTab, setActiveTab] = useState('weekly');
  const [trendData, setTrendData] = useState({
    weekly: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [45, 52, 49, 60, 55, 48, 42]
    },
    monthly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      values: [50, 45, 55, 48]
    },
    yearly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [40, 45, 55, 48, 52, 49]
    }
  });

  const [patterns, setPatterns] = useState([
    { pattern: 'Morning Peak', occurrence: 85 },
    { pattern: 'Weekend Improvement', occurrence: 72 },
    { pattern: 'Seasonal Variation', occurrence: 64 },
    { pattern: 'Rush Hour Impact', occurrence: 91 }
  ]);

  const getChartData = () => ({
    labels: trendData[activeTab].labels,
    datasets: [
      {
        label: 'Air Quality Index',
        data: trendData[activeTab].values,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  });

  const radarData = {
    labels: ['PM2.5', 'PM10', 'NO₂', 'SO₂', 'CO', 'O₃'],
    datasets: [
      {
        label: 'Current Period',
        data: [65, 59, 90, 81, 56, 55],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)'
      },
      {
        label: 'Previous Period',
        data: [28, 48, 40, 19, 96, 27],
        borderColor: '#a855f7',
        backgroundColor: 'rgba(168, 85, 247, 0.2)'
      }
    ]
  };

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
          color: '#94a3b8'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#94a3b8'
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
    <TrendsSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      id="trends"
    >
      <TrendsHeader>
        <TrendsTitle>Air Quality Trends & Patterns</TrendsTitle>
        <TabContainer>
          <Tab active={activeTab === 'weekly'} onClick={() => setActiveTab('weekly')}>Weekly</Tab>
          <Tab active={activeTab === 'monthly'} onClick={() => setActiveTab('monthly')}>Monthly</Tab>
          <Tab active={activeTab === 'yearly'} onClick={() => setActiveTab('yearly')}>Yearly</Tab>
        </TabContainer>
      </TrendsHeader>

      <GridContainer>
        <div>
          <ChartCard height="400px">
            <Line data={getChartData()} options={chartOptions} />
          </ChartCard>
          
          <ComparisonCard>
            <ComparisonItem trend={5}>
              <div className="label">Average AQI</div>
              <div className="value">52</div>
              <div className="change">↑ 5% vs last period</div>
            </ComparisonItem>
            <ComparisonItem trend={-12}>
              <div className="label">Peak Hours</div>
              <div className="value">8-10 AM</div>
              <div className="change">↓ 12% pollution</div>
            </ComparisonItem>
            <ComparisonItem trend={8}>
              <div className="label">Good Air Days</div>
              <div className="value">18</div>
              <div className="change">↑ 8% improvement</div>
            </ComparisonItem>
          </ComparisonCard>
        </div>

        <div>
          <ChartCard height="300px">
            <Radar 
              data={radarData}
              options={{
                ...chartOptions,
                scales: undefined,
                elements: {
                  line: {
                    borderWidth: 3
                  }
                }
              }}
            />
          </ChartCard>

          <InsightCard>
            <h3>Identified Patterns</h3>
            <PatternList>
              {patterns.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="icon">📊</span>
                  <span className="pattern-text">{item.pattern}</span>
                  <span className="percentage">{item.occurrence}%</span>
                </motion.li>
              ))}
            </PatternList>
          </InsightCard>
        </div>
      </GridContainer>
    </TrendsSection>
  );
}

export default Trends;