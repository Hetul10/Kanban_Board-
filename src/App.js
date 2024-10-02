// src/App.js
import React, { useState } from 'react';
import TopNav from './components/TopNav/TopNav';
import Dashboard from './components/Dashboard/Dashboard';
import useFetchData from './hooks/useFetchData'; // Import your custom hook

const App = () => {
  const { tickets, users, loading, error } = useFetchData();
  const [grouping, setGrouping] = useState("Status");
  const [ordering, setOrdering] = useState("Priority");

  const handleGroupChange = (group) => {
      setGrouping(group);
  };

  const handleOrderChange = (order) => {
      setOrdering(order);
  };

  return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <TopNav onGroupChange={handleGroupChange} onOrderChange={handleOrderChange} />
          <div style={{ flexGrow: 1, backgroundColor:"#efefef" }}>
              {loading ? (
                  <div>Loading...</div>
              ) : error ? (
                  <div>Error: {error.message}</div>
              ) : (
                  <Dashboard tickets={tickets} users={users} grouping={grouping} ordering={ordering} />
              )}
          </div>
      </div>
  );
};

export default App;
