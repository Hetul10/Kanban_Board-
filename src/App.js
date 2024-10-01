// src/App.js
import React, { useState } from 'react';
import TopNav from './components/TopNav/TopNav';
import Dashboard from './components/Dashboard/Dashboard';
import useFetchData from './hooks/useFetchData'; // Import your custom hook

const App = () => {
    const { tickets, users, loading, error } = useFetchData(); // Destructure the fetched data
    const [grouping, setGrouping] = useState("Status");
    const [ordering, setOrdering] = useState("Priority");

    const handleGroupChange = (group) => {
        setGrouping(group);
        // Handle Kanban grouping
    };

    const handleOrderChange = (order) => {
        setOrdering(order);
        // Handle Kanban sorting
    };

    return (
        <div>
            <TopNav onGroupChange={handleGroupChange} onOrderChange={handleOrderChange} />
            
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                <Dashboard tickets={tickets} users={users} grouping={grouping} ordering={ordering} />
            )}
        </div>
    );
};

export default App;
