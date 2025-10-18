import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CandidateDashboard from './pages/CandidateDashboard';
import HRDashboard from './pages/HRDashboard';
import Apply from './pages/Apply';
import { AuthProvider } from './utils/AuthContext';
import updateSW from './serviceWorker';

function App() {
  useEffect(() => {
    updateSW();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/candidate" element={<CandidateDashboard />} />
          <Route path="/hr" element={<HRDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;