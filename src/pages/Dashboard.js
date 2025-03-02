import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const DashboardSection = styled(motion.section)`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1f35 0%, #2d3663 100%);
  color: #ffffff;
  padding: 2rem;
  overflow-x: hidden;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const AQICard = styled(GlassCard)`
  text-align: center;
  
  background: ${({ aqi }) =>
    aqi <= 50
      ? "linear-gradient(135deg, rgba(72, 187, 120, 0.2), rgba(72, 187, 120, 0.4))"
      : aqi <= 100
      ? "linear-gradient(135deg, rgba(236, 201, 75, 0.2), rgba(236, 201, 75, 0.4))"
      : aqi <= 150
      ? "linear-gradient(135deg, rgba(237, 137, 54, 0.2), rgba(237, 137, 54, 0.4))"
      : "linear-gradient(135deg, rgba(245, 101, 101, 0.2), rgba(245, 101, 101, 0.4))"};

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const AQIValue = styled.div`
  font-size: 4rem;
  font-weight: bold;
  margin: 1.5rem 0;
  color: ${({ aqi }) =>
    aqi <= 50
      ? "#48bb78"
      : aqi <= 100
      ? "#ecc94b"
      : aqi <= 150
      ? "#ed8936"
      : "#f56565"};
`;

const AQIStatus = styled.div`
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: ${({ aqi }) =>
    aqi <= 50
      ? "rgba(72, 187, 120, 0.2)"
      : aqi <= 100
      ? "rgba(236, 201, 75, 0.2)"
      : aqi <= 150
      ? "rgba(237, 137, 54, 0.2)"
      : "rgba(245, 101, 101, 0.2)"};
  color: ${({ aqi }) =>
    aqi <= 50
      ? "#48bb78"
      : aqi <= 100
      ? "#ecc94b"
      : aqi <= 150
      ? "#ed8936"
      : "#f56565"};
  display: inline-block;
`;

const ChartCard = styled(GlassCard)`
  height: 400px;
`;

const PollutantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const PollutantCard = styled(GlassCard)`
  text-align: center;
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #a0aec0;
  }
  
  .value {
    font-size: 2rem;
    font-weight: bold;
    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .unit {
    font-size: 0.9rem;
    color: #718096;
    margin-top: 0.5rem;
  }
`;

const RecommendationCard = styled(GlassCard)`
  grid-column: 1 / -1;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin: 1rem 0;
    padding-left: 1.5rem;
    position: relative;
    color: #a0aec0;
    
    &:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #84fab0;
    }
  }
`;

function Dashboard({ darkMode }) {
  const [aqi, setAqi] = useState(42);
  const [pollutants, setPollutants] = useState({
    pm25: 25,
    pm10: 45,
    co: 0.8,
    no2: 21,
    so2: 5,
    o3: 48
  });
  const [historicalData, setHistoricalData] = useState({
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    values: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100))
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setAqi(prev => {
        const newValue = prev + (Math.random() * 10 - 5);
        return Math.round(Math.max(0, Math.min(300, newValue)));
      });
      
      setPollutants(prev => ({
        pm25: Math.max(0, prev.pm25 + (Math.random() * 4 - 2)),
        pm10: Math.max(0, prev.pm10 + (Math.random() * 6 - 3)),
        co: Math.max(0, prev.co + (Math.random() * 0.2 - 0.1)),
        no2: Math.max(0, prev.no2 + (Math.random() * 4 - 2)),
        so2: Math.max(0, prev.so2 + (Math.random() * 2 - 1)),
        o3: Math.max(0, prev.o3 + (Math.random() * 6 - 3))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getAQIStatus = (aqi) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  const getRecommendations = (aqi) => {
    if (aqi <= 50) {
      return [
        "Perfect conditions for outdoor activities",
        "Enjoy the fresh air",
        "Great time for exercise"
      ];
    } else if (aqi <= 100) {
      return [
        "Consider reducing prolonged outdoor activities",
        "Keep windows closed during peak hours",
        "Monitor any respiratory symptoms"
      ];
    } else {
      return [
        "Stay indoors as much as possible",
        "Use air purifiers if available",
        "Wear masks when going outside",
        "Avoid strenuous outdoor activities"
      ];
    }
  };

  const lineChartData = {
    labels: historicalData.labels,
    datasets: [{
      label: '24-Hour AQI Trend',
      data: historicalData.values,
      borderColor: '#84fab0',
      backgroundColor: 'rgba(132, 250, 176, 0.1)',
      tension: 0.4,
      fill: true
    }]
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
    <DashboardSection
      id="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <DashboardGrid>
        <AQICard
          aqi={aqi}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Air Quality Index</h2>
          <AQIValue aqi={aqi}>{Math.round(aqi)}</AQIValue>
          <AQIStatus aqi={aqi}>{getAQIStatus(aqi)}</AQIStatus>
        </AQICard>

        <ChartCard>
          <Line data={lineChartData} options={chartOptions} />
        </ChartCard>

        <PollutantGrid>
          <PollutantCard>
            <h3>PM2.5</h3>
            <div className="value">{pollutants.pm25.toFixed(1)}</div>
            <div className="unit">µg/m³</div>
          </PollutantCard>
          <PollutantCard>
            <h3>PM10</h3>
            <div className="value">{pollutants.pm10.toFixed(1)}</div>
            <div className="unit">µg/m³</div>
          </PollutantCard>
          <PollutantCard>
            <h3>CO</h3>
            <div className="value">{pollutants.co.toFixed(1)}</div>
            <div className="unit">ppm</div>
          </PollutantCard>
          <PollutantCard>
            <h3>NO₂</h3>
            <div className="value">{pollutants.no2.toFixed(1)}</div>
            <div className="unit">ppb</div>
          </PollutantCard>
          <PollutantCard>
            <h3>SO₂</h3>
            <div className="value">{pollutants.so2.toFixed(1)}</div>
            <div className="unit">ppb</div>
          </PollutantCard>
          <PollutantCard>
            <h3>O₃</h3>
            <div className="value">{pollutants.o3.toFixed(1)}</div>
            <div className="unit">ppb</div>
          </PollutantCard>
        </PollutantGrid>

        <RecommendationCard>
          <h3>Recommendations</h3>
          <ul>
            {getRecommendations(aqi).map((rec, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {rec}
              </motion.li>
            ))}
          </ul>
        </RecommendationCard>
      </DashboardGrid>
    </DashboardSection>
  );
}

export default Dashboard;