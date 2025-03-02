import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { Bell, Settings, AlertTriangle, Check, X, Clock, MapPin, Wind } from "react-feather";

const AlertsSection = styled(motion.section)`
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  color: #ffffff;
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const AlertsTitle = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(120deg, #818cf8 0%, #c7d2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 3rem;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const AlertForm = styled(Card)`
  h3 {
    color: #818cf8;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    color: #c7d2fe;
    margin-bottom: 0.5rem;
  }
  
  input, select {
    width: 100%;
    padding: 0.75rem;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    
    &:focus {
      outline: none;
      border-color: #818cf8;
    }
  }
`;

const ThresholdSlider = styled.div`
  margin: 2rem 0;
  
  .slider-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    color: #c7d2fe;
  }
  
  input[type="range"] {
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, #818cf8 0%, #c7d2fe 100%);
    border-radius: 3px;
    outline: none;
    
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      background: #ffffff;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;

const NotificationList = styled(Card)`
  h3 {
    color: #818cf8;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  max-height: 600px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #818cf8;
    border-radius: 4px;
  }
`;

const NotificationItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  .icon {
    padding: 0.5rem;
    background: ${props => {
      switch (props.severity) {
        case 'high': return 'rgba(239, 68, 68, 0.2)';
        case 'medium': return 'rgba(245, 158, 11, 0.2)';
        default: return 'rgba(34, 197, 94, 0.2)';
      }
    }};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      color: ${props => {
        switch (props.severity) {
          case 'high': return '#ef4444';
          case 'medium': return '#f59e0b';
          default: return '#22c55e';
        }
      }};
    }
  }
  
  .content {
    flex: 1;
    
    h4 {
      color: #c7d2fe;
      margin-bottom: 0.25rem;
    }
    
    p {
      color: #94a3b8;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
  
  .time {
    color: #94a3b8;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const ActionButton = styled(motion.button)`
  background: linear-gradient(90deg, #818cf8, #c7d2fe);
  color: #ffffff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
    
    &:checked + span {
      background: linear-gradient(90deg, #818cf8, #c7d2fe);
    }
    
    &:checked + span:before {
      transform: translateX(26px);
    }
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    transition: 0.4s;
    border-radius: 34px;
    
    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }
`;

function Alerts() {
  const [threshold, setThreshold] = useState(50);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "High AQI Alert",
      message: "AQI levels have exceeded your threshold in Downtown",
      severity: "high",
      time: "2 minutes ago",
      location: "Downtown"
    },
    {
      id: 2,
      title: "Air Quality Improving",
      message: "AQI levels are returning to normal ranges",
      severity: "low",
      time: "1 hour ago",
      location: "Residential Area"
    },
    {
      id: 3,
      title: "Moderate AQI Warning",
      message: "AQI levels are approaching your threshold",
      severity: "medium",
      time: "3 hours ago",
      location: "Industrial Zone"
    }
  ]);

  return (
    <AlertsSection
      id="alerts"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <AlertsTitle>Alerts & Notifications</AlertsTitle>
      
      <ContentWrapper>
        <AlertForm>
          <h3><Settings size={20} /> Alert Settings</h3>
          
          <InputGroup>
            <label>Location</label>
            <select>
              <option value="all">All Locations</option>
              <option value="downtown">Downtown</option>
              <option value="residential">Residential Area</option>
              <option value="industrial">Industrial Zone</option>
            </select>
          </InputGroup>
          
          <InputGroup>
            <label>Notification Method</label>
            <select>
              <option value="app">In-App Notification</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
            </select>
          </InputGroup>
          
          <ThresholdSlider>
            <div className="slider-header">
              <span>AQI Threshold</span>
              <span>{threshold}</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
            />
          </ThresholdSlider>
          
          <InputGroup>
            <label>Alert Frequency</label>
            <select>
              <option value="immediate">Immediate</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily Summary</option>
            </select>
          </InputGroup>
          
          <InputGroup style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ margin: 0 }}>Enable Notifications</label>
              <ToggleSwitch>
                <input type="checkbox" defaultChecked />
                <span></span>
              </ToggleSwitch>
            </div>
          </InputGroup>
          
          <ActionButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Check size={18} /> Save Settings
          </ActionButton>
        </AlertForm>
        
        <NotificationList>
          <h3><Bell size={20} /> Recent Notifications</h3>
          <AnimatePresence>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                severity={notification.severity}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="icon">
                  {notification.severity === 'high' ? <AlertTriangle size={20} /> :
                   notification.severity === 'medium' ? <Wind size={20} /> :
                   <Check size={20} />}
                </div>
                <div className="content">
                  <h4>{notification.title}</h4>
                  <p>
                    <MapPin size={14} /> {notification.location}
                  </p>
                  <p>{notification.message}</p>
                </div>
                <div className="time">
                  <Clock size={14} />
                  {notification.time}
                </div>
              </NotificationItem>
            ))}
          </AnimatePresence>
        </NotificationList>
      </ContentWrapper>
    </AlertsSection>
  );
}

export default Alerts;
