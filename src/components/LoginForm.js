import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    vehicleRegNumber: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="login-form">
      <div className="content">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="vehicleRegNumber">Vehicle Registration Number</label>
            <input
              type="text"
              id="vehicleRegNumber"
              name="vehicleRegNumber"
              value={formData.vehicleRegNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}

export default LoginForm;
