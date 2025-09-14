import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { Foods } from './pages/Foods';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foods" element={<Foods />} />
      </Routes>
    </Router>
  );
};

export default App;
