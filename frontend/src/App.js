import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import AddMedication from './pages/AddMedication';
import Features from './pages/Features';
import Contact from './pages/Contact';
// import Reminders from './pages/Reminders';




// import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/addmedication" element={<AddMedication />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
      {/* <Route path="/reminders" element={<Reminders />} /> */}


      {/* <Route path="/dashboard" element={<Dashboard />} /> */}

    </Routes>
  );
}

export default App;
