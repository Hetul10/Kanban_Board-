// src/components/DataFetcher.jsx
import React, { useEffect } from 'react';
import axios from 'axios';

const DataFetcher = ({ setTickets, setUsers, setLoading, setError }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
                const { tickets, users } = response.data; // Destructure the response
                setTickets(tickets);
                setUsers(users);
            } catch (error) {
                console.error('Fetch Error:', error.message); // Log the error
                setError(error); // Assuming setError is defined in the parent component
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchData();
    }, [setTickets, setUsers, setLoading, setError]);

    return null; // No UI, just data fetching
};

export default DataFetcher;
