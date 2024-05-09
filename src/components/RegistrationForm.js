import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    vehicleRegNumber: '',
    fleetNumber: '',
    saccoName: '',
    password: '',
    profilePicture: null, //  profile picture state
    driverName: '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profilePicture: file
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here send the form data to  backend, including the profile picture
  };

  return (
    <div className="registration-form">
      <div className="content">
        <div className='content-regform'>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="driverName">Driver's Name</label>
              <input
                type="text"
                id="driverName"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="vehicleRegNumber">Vehicle Registration Number</label>
              <input
                type="text"
                id="vehicleRegNumber"
                name="vehicleRegNumber"
                value={formData.vehicleRegNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="fleetNumber">Fleet Number</label>
              <input
                type="text"
                id="fleetNumber"
                name="fleetNumber"
                value={formData.fleetNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="saccoName">Sacco Name</label>
              <input
                type="text"
                id="saccoName"
                name="saccoName"
                value={formData.saccoName}
                onChange={handleChange}
                required
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
                required
              />
            </div>
            {/* Profile picture input field */}
            <div className="form-group">
              <label htmlFor="profilePicture">Profile Picture</label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
            </div>
            <button type="submit">Register</button>
          </form>
          <p>Already have an account? <Link to="/">Login here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
