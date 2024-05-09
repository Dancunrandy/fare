import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import videoSrc from './Test.mp4'; 

function App() {
  return (
    <Router>
      <div className="App">
        <video autoPlay muted loop className="video-bg">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Header />
        <div className="content">
          <Switch>
            <Route path="/" exact component={LoginForm} />
            <Route path="/register" component={RegistrationForm} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
