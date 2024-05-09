import React, { useState, useEffect } from 'react';
import '../index.css'; 

const Dashboard = () => {
  // Dummy data for demonstration
  const [vehicleProfile, setVehicleProfile] = useState({
    vehicleRegNumber: '',
    fleetNumber: '',
    saccoName: '',
    profilePhoto: '', 
    driverName: '' 
  });

  const [report, setReport] = useState({
    tripsMade: 0,
    profitLoss: 0,
  });

  // fetching data from a server
  useEffect(() => {
    // fetching data from the backend
    fetchVehicleData(); // Fetch vehicle data
    fetchReportData(); // Fetch report data
  }, []);

  // Function to fetch vehicle data from the backend
  const fetchVehicleData = async () => {
    try {
      
      const response = await fetch('/api/vehicle');
      if (!response.ok) {
        throw new Error('Failed to fetch vehicle data');
      }
      const data = await response.json();
      setVehicleProfile(data); 
    } catch (error) {
      console.error('Error fetching vehicle data:', error.message);
    }
  };

  // Function to fetch report data from the backend
  const fetchReportData = async () => {
    try {
    
      const response = await fetch('/api/report');
      if (!response.ok) {
        throw new Error('Failed to fetch report data');
      }
      const data = await response.json();
      setReport(data); 
    } catch (error) {
      console.error('Error fetching report data:', error.message);
    }
  };

  // Function to handle profile deletion
  const handleDeleteProfile = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete profile');
      }
      // Reset vehicle profile data after deletion
      setVehicleProfile({
        vehicleRegNumber: '',
        fleetNumber: '',
        saccoName: '',
        profilePhoto: '', 
        driverName: '' 
      });
    } catch (error) {
      console.error('Error deleting profile:', error.message);
    }
  };

  // Function to handle profile update
  const handleUpdateProfile = async () => {
    console.log('Updating profile...');
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="vehicle-profile">
        <h3>Vehicle Profile</h3>
        <p><strong>Driver's Name:</strong> {vehicleProfile.driverName}</p>
        <p><strong>Vehicle Registration Number:</strong> {vehicleProfile.vehicleRegNumber}</p>
        <p><strong>Fleet Number:</strong> {vehicleProfile.fleetNumber}</p>
        <p><strong>Sacco Name:</strong> {vehicleProfile.saccoName}</p>
        <button onClick={handleDeleteProfile}>Delete Profile</button>
        <button onClick={handleUpdateProfile}>Edit Profile</button> {/* Changed text to "Edit Profile" */}
      </div>
      <div className="report">
        <h3>Report</h3>
        <p><strong>Number of Trips Made:</strong> {report.tripsMade}</p>
        <p><strong>Profit/Loss Made:</strong> ${report.profitLoss}</p>
      </div>
    </div>
  );
}

export default Dashboard;
