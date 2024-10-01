// src/hooks/useFetchData.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
                const { tickets, users } = response.data;
                setTickets(tickets);
                setUsers(users);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { tickets, users, loading, error };
};

export default useFetchData;
