import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegister from './LoginRegister';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/LoginRegister" component={<LoginRegister/>} />
        <Route path="/Dashboard" component={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;