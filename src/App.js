import React, { useState, useEffect } from 'react';
import Navbar from './components/TopNav/TopNav';
import Dashboard from './components/Dashboard/Dashboard';
import axios from 'axios'; // Import axios for fetching data

const App = () => {
    const [tickets, setTickets] = useState([]); // State for tickets
    const [users, setUsers] = useState([]); // State for users
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error

    // Data fetching inside App component
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
                const { tickets, users } = response.data; // Destructure the response
                setTickets(tickets);
                setUsers(users);
            } catch (error) {
                console.error('Fetch Error:', error.message); // Log the error
                setError(error);
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchData();
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
        <div>
           
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                <Dashboard tickets={tickets} users={users} />
            )}
        </div>
    );
};

export default App;
