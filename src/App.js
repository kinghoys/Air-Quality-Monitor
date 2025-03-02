import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Trends from "./pages/Trends";
import HealthTips from "./pages/HealthTips";
import Settings from "./pages/Settings";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Alerts from "./pages/Alerts";
import HospitalUse from "./pages/HospitalUse";
import Auth from "./pages/Auth";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <div style={{ minHeight: "100vh" }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
              <Route path="/trends" element={<Trends darkMode={darkMode} />} />
              <Route path="/alerts" element={<Alerts darkMode={darkMode} />} />
              <Route path="/health-tips" element={<HealthTips darkMode={darkMode} />} />
              <Route path="/how-it-works" element={<HowItWorks darkMode={darkMode} />} />
              <Route path="/hospital-use" element={<HospitalUse darkMode={darkMode} />} />
              <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </motion.div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;