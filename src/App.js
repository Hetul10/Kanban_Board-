// App.js
import React, { useState } from 'react';
import Navbar from './components/TopNav/TopNav';
import DashBoard from './components/Dashboard/Dashboard'; // Assuming you have a TicketList component

const App = () => {
    const [groupBy, setGroupBy] = useState('status'); // Default grouping
    const [sortBy, setSortBy] = useState('priority'); // Default sorting

    return (
        <div>
           
            <DashBoard />
        </div>
    );
};

export default App;
