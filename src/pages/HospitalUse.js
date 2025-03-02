import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Line } from '@nivo/line';
import { Pie } from '@nivo/pie';
import {
  Truck,
  MapPin,
  Wind,
  Activity,
  AlertTriangle,
  Map,
  TrendingUp,
  Home,
  ThermometerIcon,
  Heart,
  FileText,
  Users,
  Circle,
  Clock,
  Clipboard,
  TrendingDown,
  Filter,
  Thermometer,
  Search,
  Calendar,
  AlertCircle
} from "react-feather";

const Section = styled(motion.section)`
  min-height: 100vh;
  background: linear-gradient(135deg, #004d40 0%, #00695c 100%);
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
  background: linear-gradient(120deg, #80cbc4 0%, #4db6ac 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Subtitle = styled.p`
  color: #80cbc4;
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
`;

const UseCasesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const UseCase = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  .header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    
    .number {
      font-size: 1.5rem;
      color: #4db6ac;
      font-weight: bold;
    }
    
    h3 {
      color: #e0f2f1;
      font-size: 1.4rem;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      
      svg {
        color: #4db6ac;
      }
    }
  }
`;

const CustomMap = styled.div`
  height: 300px;
  margin: 1.5rem 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  position: relative;
  overflow: hidden;
  
  .grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 4px;
    height: 100%;
  }
  
  .hospital {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.1);
    }
    
    .icon {
      background: rgba(77, 182, 172, 0.2);
      padding: 0.5rem;
      border-radius: 50%;
    }
    
    .label {
      font-size: 0.8rem;
      color: #e0f2f1;
      text-align: center;
    }
    
    .aqi {
      font-size: 0.7rem;
      padding: 0.2rem 0.5rem;
      border-radius: 12px;
      background: ${props => props.good ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'};
    }
  }
  
  .route {
    position: absolute;
    height: 2px;
    background: ${props => props.dangerous ? '#f44336' : '#4caf50'};
    opacity: 0.5;
  }
`;

const ChartContainer = styled.div`
  height: 500px;
  width: 100%;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  margin: 2rem 0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.2);
  }
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const TimeRangeContainer = styled.div`
  display: flex;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 8px;
  border-radius: 12px;
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  background: rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
`;

const StatCard = styled(motion.div)`
  padding: 1rem;
  background: ${props => props.color || 'rgba(77, 182, 172, 0.1)'};
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h4 {
    margin: 0;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
  }

  .value {
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
    margin: 0.5rem 0;
  }

  .label {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Button = styled.button`
  background: ${props => props.active ? 'rgba(77, 182, 172, 0.3)' : 'rgba(0, 0, 0, 0.2)'};
  border: 1px solid ${props => props.active ? '#4db6ac' : 'transparent'};
  color: #e0f2f1;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(77, 182, 172, 0.4);
    border-color: #4db6ac;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const VentilationSimulator = styled.div`
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  
  .controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .visualization {
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    
    .particles {
      position: absolute;
      width: 100%;
      height: 100%;
      transition: opacity 0.5s ease;
    }
  }
`;

const SiteCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  h3 {
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #e0f2f1;
  }
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Metric = styled.div`
  background: ${props => props.color || 'rgba(77, 182, 172, 0.1)'};
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  .label {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0.5rem;
  }
  
  .value {
    font-size: 1.8rem;
    font-weight: 600;
    color: #fff;
  }
  
  .trend {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: ${props => props.trendColor || '#4caf50'};
  }
`;

const RecommendationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Recommendation = styled(motion.div)`
  background: rgba(0, 0, 0, 0.15);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .icon {
    background: ${props => props.iconColor || '#4db6ac'};
    padding: 0.75rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .content {
    flex: 1;
    
    h4 {
      margin: 0 0 0.25rem 0;
      color: #e0f2f1;
    }
    
    p {
      margin: 0;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.7);
    }
  }
  
  .priority {
    font-size: 0.8rem;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    background: ${props => props.priorityColor || 'rgba(77, 182, 172, 0.2)'};
    color: #fff;
  }
`;

function HospitalUse({ darkMode }) {
  const [ventilationStatus, setVentilationStatus] = useState('normal');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState({ x: "Location A", aqi: 80 });
  const [timeRange, setTimeRange] = useState('1y');
  const [diseaseFilter, setDiseaseFilter] = useState('all');
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const hospitals = [
    { id: 1, name: 'Hospital A', x: 20, y: 30, aqi: 75 },
    { id: 2, name: 'Hospital B', x: 70, y: 60, aqi: 150 },
    { id: 3, name: 'Hospital C', x: 40, y: 70, aqi: 90 }
  ];

  // Enhanced data for site selection
  const locationData = {
    "1y": [
      { x: "2024", y: 80, location: "Location A" },
      { x: "2024", y: 150, location: "Location B" },
      { x: "2024", y: 60, location: "Location C" },
      { x: "2024", y: 95, location: "Location D" }
    ],
    "2y": [
      { x: "2023", y: 75, location: "Location A" },
      { x: "2023", y: 145, location: "Location B" },
      { x: "2023", y: 65, location: "Location C" },
      { x: "2023", y: 90, location: "Location D" },
      { x: "2024", y: 85, location: "Location A" },
      { x: "2024", y: 165, location: "Location B" },
      { x: "2024", y: 55, location: "Location C" },
      { x: "2024", y: 100, location: "Location D" }
    ],
    "5y": [
      { x: "2020", y: 70, location: "Location A" },
      { x: "2020", y: 140, location: "Location B" },
      { x: "2020", y: 55, location: "Location C" },
      { x: "2020", y: 85, location: "Location D" },
      { x: "2021", y: 72, location: "Location A" },
      { x: "2021", y: 155, location: "Location B" },
      { x: "2021", y: 50, location: "Location C" },
      { x: "2021", y: 88, location: "Location D" },
      { x: "2022", y: 78, location: "Location A" },
      { x: "2022", y: 160, location: "Location B" },
      { x: "2022", y: 52, location: "Location C" },
      { x: "2022", y: 92, location: "Location D" },
      { x: "2023", y: 73, location: "Location A" },
      { x: "2023", y: 170, location: "Location B" },
      { x: "2023", y: 48, location: "Location C" },
      { x: "2023", y: 87, location: "Location D" },
      { x: "2024", y: 75, location: "Location A" },
      { x: "2024", y: 180, location: "Location B" },
      { x: "2024", y: 50, location: "Location C" },
      { x: "2024", y: 90, location: "Location D" }
    ]
  };

  const locations = ["Location A", "Location B", "Location C", "Location D"];
  
  const lineData = locations.map((location) => ({
    id: location,
    data: locationData[timeRange]
      .filter((d) => d.location === location)
      .map((d) => ({ x: d.x, y: d.y }))
  }));

  // Enhanced data for disease monitoring
  const diseaseData = {
    all: [
      { id: "Asthma", value: 35, details: "35% of respiratory cases" },
      { id: "COPD", value: 25, details: "25% of respiratory cases" },
      { id: "Bronchitis", value: 20, details: "20% of respiratory cases" },
      { id: "Pneumonia", value: 15, details: "15% of respiratory cases" },
      { id: "Other", value: 5, details: "5% of respiratory cases" }
    ],
    seasonal: [
      { id: "Winter", value: 40, details: "40% increase in cases" },
      { id: "Spring", value: 25, details: "25% increase in cases" },
      { id: "Summer", value: 15, details: "15% increase in cases" },
      { id: "Fall", value: 20, details: "20% increase in cases" }
    ],
    severity: [
      { id: "Mild", value: 45, details: "45% of cases" },
      { id: "Moderate", value: 30, details: "30% of cases" },
      { id: "Severe", value: 25, details: "25% of cases" }
    ]
  };

  // Location recommendation based on AQI
  const getLocationRecommendation = (aqi) => {
    if (aqi < 50) return { status: 'Excellent', color: '#4caf50' };
    if (aqi < 100) return { status: 'Good', color: '#8bc34a' };
    if (aqi < 150) return { status: 'Moderate', color: '#ffc107' };
    return { status: 'Poor', color: '#f44336' };
  };

  return (
    <Section
      id="hospital-use"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <ContentWrapper>
        <Header>
          <Title>
            <Heart size={32} />
            Hospital Integration
          </Title>
          <Subtitle>
            How hospitals leverage our air quality monitoring system to enhance patient care and safety
          </Subtitle>
        </Header>

        <UseCasesGrid>
          <UseCase
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.1 }}
          >
            <div className="header">
              <span className="number">1️⃣</span>
              <h3>
                <Truck size={24} />
                Emergency Patient Transfers
              </h3>
            </div>
            <CustomMap>
              {hospitals.map((hospital) => (
                <motion.div
                  key={hospital.id}
                  className="hospital"
                  style={{ left: `${hospital.x}%`, top: `${hospital.y}%` }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedHospital(hospital)}
                >
                  <div className="icon">
                    <MapPin size={20} color="#4db6ac" />
                  </div>
                  <div className="label">{hospital.name}</div>
                  <div className="aqi" style={{ 
                    background: hospital.aqi > 100 ? 'rgba(244, 67, 54, 0.3)' : 'rgba(76, 175, 80, 0.3)'
                  }}>
                    AQI: {hospital.aqi}
                  </div>
                </motion.div>
              ))}
              {/* Add animated routes between hospitals */}
              <motion.div
                className="route"
                style={{
                  width: '30%',
                  left: '25%',
                  top: '40%',
                  transform: 'rotate(45deg)',
                  transformOrigin: '0 0'
                }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </CustomMap>
          </UseCase>

          <UseCase>
            <div className="header">
              <span className="number">2️⃣</span>
              <h3>
                <MapPin size={24} />
                Hospital Site Selection
              </h3>
            </div>
            <SiteCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>
                <MapPin size={20} />
                Site Selection Metrics
              </h3>
              
              <MetricGrid>
                <Metric color="rgba(33, 150, 243, 0.15)" trendColor="#2196f3">
                  <div className="label">Average AQI</div>
                  <div className="value">85</div>
                  <div className="trend">
                    <TrendingDown size={16} />
                    5% improvement
                  </div>
                </Metric>
                
                <Metric color="rgba(156, 39, 176, 0.15)" trendColor="#9c27b0">
                  <div className="label">Population Density</div>
                  <div className="value">2,450</div>
                  <div className="trend">
                    <TrendingUp size={16} />
                    Growing area
                  </div>
                </Metric>
                
                <Metric color="rgba(255, 152, 0, 0.15)" trendColor="#ff9800">
                  <div className="label">Emergency Response</div>
                  <div className="value">4.2min</div>
                  <div className="trend">
                    <TrendingDown size={16} />
                    Optimal range
                  </div>
                </Metric>
                
                <Metric color="rgba(76, 175, 80, 0.15)" trendColor="#4caf50">
                  <div className="label">Green Coverage</div>
                  <div className="value">35%</div>
                  <div className="trend">
                    <TrendingUp size={16} />
                    Above target
                  </div>
                </Metric>
              </MetricGrid>
              
              <h3>
                <Clipboard size={20} />
                Recommendations
              </h3>
              
              <RecommendationList>
                <Recommendation 
                  iconColor="#4caf50"
                  priorityColor="rgba(76, 175, 80, 0.2)"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="icon">
                    <Wind size={20} color="white" />
                  </div>
                  <div className="content">
                    <h4>Air Quality Optimization</h4>
                    <p>Install advanced air filtration systems and monitor AQI trends</p>
                  </div>
                  <div className="priority">High Priority</div>
                </Recommendation>
                
                <Recommendation 
                  iconColor="#2196f3"
                  priorityColor="rgba(33, 150, 243, 0.2)"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="icon">
                    <Map size={20} color="white" />
                  </div>
                  <div className="content">
                    <h4>Location Assessment</h4>
                    <p>Evaluate proximity to major roads and industrial areas</p>
                  </div>
                  <div className="priority">Medium Priority</div>
                </Recommendation>
                
                <Recommendation 
                  iconColor="#ff9800"
                  priorityColor="rgba(255, 152, 0, 0.2)"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="icon">
                    <Activity size={20} color="white" />
                  </div>
                  <div className="content">
                    <h4>Environmental Impact</h4>
                    <p>Conduct regular environmental impact assessments</p>
                  </div>
                  <div className="priority">Ongoing</div>
                </Recommendation>
              </RecommendationList>
            </SiteCard>
          </UseCase>

          <UseCase>
            <div className="header">
              <span className="number">3️⃣</span>
              <h3>
                <Wind size={24} />
                Indoor Air Quality Management
              </h3>
            </div>
            <SiteCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>
                <Activity size={20} />
                Real-time Monitoring
              </h3>
              
              <MetricGrid>
                <Metric color="rgba(33, 150, 243, 0.15)" trendColor="#2196f3">
                  <div className="label">PM2.5 Level</div>
                  <div className="value">12.5</div>
                  <div className="trend">
                    <TrendingDown size={16} />
                    Within safe limits
                  </div>
                </Metric>
                
                <Metric color="rgba(156, 39, 176, 0.15)" trendColor="#9c27b0">
                  <div className="label">CO2 Level</div>
                  <div className="value">650</div>
                  <div className="trend">
                    <TrendingDown size={16} />
                    Optimal range
                  </div>
                </Metric>
                
                <Metric color="rgba(255, 152, 0, 0.15)" trendColor="#ff9800">
                  <div className="label">Humidity</div>
                  <div className="value">45%</div>
                  <div className="trend">
                    <Activity size={16} />
                    Balanced
                  </div>
                </Metric>
                
                <Metric color="rgba(76, 175, 80, 0.15)" trendColor="#4caf50">
                  <div className="label">Air Exchange Rate</div>
                  <div className="value">8.5/h</div>
                  <div className="trend">
                    <TrendingUp size={16} />
                    Above standard
                  </div>
                </Metric>
              </MetricGrid>
              
              <h3>
                <AlertTriangle size={20} />
                System Alerts
              </h3>
              
              <RecommendationList>
                <Recommendation 
                  iconColor="#4caf50"
                  priorityColor="rgba(76, 175, 80, 0.2)"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="icon">
                    <Filter size={20} color="white" />
                  </div>
                  <div className="content">
                    <h4>HEPA Filter Status</h4>
                    <p>All filters operating at optimal efficiency</p>
                  </div>
                  <div className="priority">Normal</div>
                </Recommendation>
                
                <Recommendation 
                  iconColor="#ff9800"
                  priorityColor="rgba(255, 152, 0, 0.2)"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="icon">
                    <Thermometer size={20} color="white" />
                  </div>
                  <div className="content">
                    <h4>Temperature Control</h4>
                    <p>Room 205 showing slight temperature variation</p>
                  </div>
                  <div className="priority">Monitor</div>
                </Recommendation>
              </RecommendationList>
            </SiteCard>
          </UseCase>

          <UseCase>
            <div className="header">
              <span className="number">4️⃣</span>
              <h3>
                <Activity size={24} />
                Disease Monitoring & Research
              </h3>
            </div>
            <SiteCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>
                <FileText size={20} />
                Disease Patterns
              </h3>
              
              <MetricGrid>
                <Metric color="rgba(244, 67, 54, 0.15)" trendColor="#f44336">
                  <div className="label">Respiratory Cases</div>
                  <div className="value">+12%</div>
                  <div className="trend">
                    <TrendingUp size={16} />
                    Above seasonal average
                  </div>
                </Metric>
                
                <Metric color="rgba(0, 150, 136, 0.15)" trendColor="#009688">
                  <div className="label">Asthma Triggers</div>
                  <div className="value">-8%</div>
                  <div className="trend">
                    <TrendingDown size={16} />
                    Decreasing trend
                  </div>
                </Metric>
                
                <Metric color="rgba(103, 58, 183, 0.15)" trendColor="#673ab7">
                  <div className="label">Allergic Reactions</div>
                  <div className="value">15</div>
                  <div className="trend">
                    <Activity size={16} />
                    Weekly cases
                  </div>
                </Metric>
                
                <Metric color="rgba(255, 193, 7, 0.15)" trendColor="#ffc107">
                  <div className="label">Air Quality Correlation</div>
                  <div className="value">0.85</div>
                  <div className="trend">
                    <TrendingUp size={16} />
                    Strong correlation
                  </div>
                </Metric>
              </MetricGrid>
              
              <h3>
                <Search size={20} />
                Research Insights
              </h3>
              
              <RecommendationList>
                <Recommendation 
                  iconColor="#673ab7"
                  priorityColor="rgba(103, 58, 183, 0.2)"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="icon">
                    <TrendingUp size={20} color="white" />
                  </div>
                  <div className="content">
                    <h4>Pattern Analysis</h4>
                    <p>Strong correlation between PM2.5 levels and respiratory cases</p>
                  </div>
                  <div className="priority">Key Finding</div>
                </Recommendation>
                
                <Recommendation 
                  iconColor="#009688"
                  priorityColor="rgba(0, 150, 136, 0.2)"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="icon">
                    <Calendar size={20} color="white" />
                  </div>
                  <div className="content">
                    <h4>Seasonal Trends</h4>
                    <p>Winter months show 30% increase in respiratory cases</p>
                  </div>
                  <div className="priority">Seasonal</div>
                </Recommendation>
                
                <Recommendation 
                  iconColor="#f44336"
                  priorityColor="rgba(244, 67, 54, 0.2)"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="icon">
                    <AlertCircle size={20} color="white" />
                  </div>
                  <div className="content">
                    <h4>Critical Threshold</h4>
                    <p>AQI above 150 triggers significant increase in admissions</p>
                  </div>
                  <div className="priority">Alert</div>
                </Recommendation>
              </RecommendationList>
            </SiteCard>
          </UseCase>
        </UseCasesGrid>
      </ContentWrapper>
    </Section>
  );
}

export default HospitalUse;
