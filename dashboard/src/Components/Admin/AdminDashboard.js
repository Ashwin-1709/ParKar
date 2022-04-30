import React from 'react'
import NavbarAdmin from './NavbarAdmin';
import ParkingSpaces from './ParkingSpaces';
import BookingDetails from './BookingDetails';
import { BrowserRouter, Route } from 'react-router-dom';
import ManageWorkers from './ManageWorkers';
const AdminDashboard = () => {
    return (
    
        <div>
            <NavbarAdmin />
            <ParkingSpaces />
           
        </div>
  
    )
}

export default AdminDashboard;
