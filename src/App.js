import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import backgroundImage from './images/background.webp'; 

function App() {
  return (
    <Router>
      <div className="App">
        <div className="background-img" style={{backgroundImage: `url(${backgroundImage})`}}/>
        <Header />
        <div className="content">
          <Switch>
            <Route path="/" exact component={LoginForm} />
            <Route path="/register" component={RegistrationForm} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
