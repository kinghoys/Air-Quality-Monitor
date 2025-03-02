import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { Settings as SettingsIcon, Bell, Globe, Moon, Shield, Map, Sliders, Save, RefreshCw } from "react-feather";

const SettingsSection = styled(motion.section)`
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  color: #ffffff;
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(120deg, #818cf8 0%, #c7d2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Subtitle = styled.p`
  color: #94a3b8;
  font-size: 1.1rem;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CategoryTitle = styled.h3`
  color: #818cf8;
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  margin-bottom: 1rem;
  
  .setting-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    
    .setting-name {
      color: #e2e8f0;
      font-weight: 500;
    }
    
    .setting-description {
      color: #94a3b8;
      font-size: 0.9rem;
    }
  }
`;

const Toggle = styled(motion.div)`
  width: 52px;
  height: 28px;
  background: ${({ active }) => (active ? "linear-gradient(120deg, #818cf8 0%, #c7d2fe 100%)" : "rgba(255, 255, 255, 0.1)")};
  border-radius: 14px;
  position: relative;
  cursor: pointer;
  padding: 2px;
`;

const Knob = styled(motion.div)`
  width: 24px;
  height: 24px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  
  option {
    background: #1e1b4b;
    color: #ffffff;
  }
`;

const ActionButton = styled(motion.button)`
  background: linear-gradient(90deg, #818cf8, #c7d2fe);
  color: #1e1b4b;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem auto;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ResetButton = styled(ActionButton)`
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

function Settings({ darkMode, setDarkMode }) {
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    alerts: true,
    weekly: false
  });
  
  const [preferences, setPreferences] = useState({
    units: 'metric',
    language: 'en',
    updateFrequency: '5min',
    dataRetention: '30days'
  });
  
  const [privacy, setPrivacy] = useState({
    locationTracking: true,
    dataSaving: false,
    analytics: true
  });

  const handleSave = () => {
    // Save settings logic here
  };

  const handleReset = () => {
    // Reset to defaults logic here
  };

  return (
    <SettingsSection
      id="settings"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <ContentWrapper>
        <Header>
          <Title>
            <SettingsIcon size={32} />
            Settings & Preferences
          </Title>
          <Subtitle>Customize your air quality monitoring experience</Subtitle>
        </Header>

        <SettingsGrid>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CategoryTitle><Bell size={20} /> Notifications</CategoryTitle>
            <SettingItem>
              <div className="setting-info">
                <div className="setting-name">Push Notifications</div>
                <div className="setting-description">Receive instant alerts on your device</div>
              </div>
              <Toggle
                active={notifications.push}
                onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
              >
                <Knob animate={{ x: notifications.push ? 24 : 0 }} />
              </Toggle>
            </SettingItem>
            <SettingItem>
              <div className="setting-info">
                <div className="setting-name">Email Notifications</div>
                <div className="setting-description">Get daily summaries via email</div>
              </div>
              <Toggle
                active={notifications.email}
                onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
              >
                <Knob animate={{ x: notifications.email ? 24 : 0 }} />
              </Toggle>
            </SettingItem>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CategoryTitle><Globe size={20} /> Display & Units</CategoryTitle>
            <SettingItem>
              <div className="setting-info">
                <div className="setting-name">Dark Mode</div>
                <div className="setting-description">Switch between light and dark themes</div>
              </div>
              <Toggle
                active={darkMode}
                onClick={() => setDarkMode(!darkMode)}
              >
                <Knob animate={{ x: darkMode ? 24 : 0 }} />
              </Toggle>
            </SettingItem>
            <SettingItem>
              <div className="setting-info">
                <div className="setting-name">Measurement Units</div>
                <div className="setting-description">Choose your preferred unit system</div>
              </div>
              <Select
                value={preferences.units}
                onChange={(e) => setPreferences(prev => ({ ...prev, units: e.target.value }))}
              >
                <option value="metric">Metric (°C, km)</option>
                <option value="imperial">Imperial (°F, mi)</option>
              </Select>
            </SettingItem>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CategoryTitle><Shield size={20} /> Privacy & Data</CategoryTitle>
            <SettingItem>
              <div className="setting-info">
                <div className="setting-name">Location Tracking</div>
                <div className="setting-description">Allow location-based air quality data</div>
              </div>
              <Toggle
                active={privacy.locationTracking}
                onClick={() => setPrivacy(prev => ({ ...prev, locationTracking: !prev.locationTracking }))}
              >
                <Knob animate={{ x: privacy.locationTracking ? 24 : 0 }} />
              </Toggle>
            </SettingItem>
            <SettingItem>
              <div className="setting-info">
                <div className="setting-name">Data Retention</div>
                <div className="setting-description">Choose how long to keep your data</div>
              </div>
              <Select
                value={preferences.dataRetention}
                onChange={(e) => setPreferences(prev => ({ ...prev, dataRetention: e.target.value }))}
              >
                <option value="7days">7 Days</option>
                <option value="30days">30 Days</option>
                <option value="90days">90 Days</option>
                <option value="unlimited">Unlimited</option>
              </Select>
            </SettingItem>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CategoryTitle><Sliders size={20} /> App Preferences</CategoryTitle>
            <SettingItem>
              <div className="setting-info">
                <div className="setting-name">Update Frequency</div>
                <div className="setting-description">How often to refresh air quality data</div>
              </div>
              <Select
                value={preferences.updateFrequency}
                onChange={(e) => setPreferences(prev => ({ ...prev, updateFrequency: e.target.value }))}
              >
                <option value="1min">Every Minute</option>
                <option value="5min">Every 5 Minutes</option>
                <option value="15min">Every 15 Minutes</option>
                <option value="30min">Every 30 Minutes</option>
              </Select>
            </SettingItem>
            <SettingItem>
              <div className="setting-info">
                <div className="setting-name">Language</div>
                <div className="setting-description">Choose your preferred language</div>
              </div>
              <Select
                value={preferences.language}
                onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </Select>
            </SettingItem>
          </Card>
        </SettingsGrid>

        <ActionButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
        >
          <Save size={18} />
          Save Changes
        </ActionButton>

        <ResetButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleReset}
        >
          <RefreshCw size={18} />
          Reset to Defaults
        </ResetButton>
      </ContentWrapper>
    </SettingsSection>
  );
}

export default Settings;