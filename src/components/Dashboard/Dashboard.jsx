import React from 'react';
import Card from '../Card/Card';

const Dashboard = ({ tickets, users }) => {
    console.log('Tickets:', tickets);
    console.log('Users:', users);
    

    return (
        <div className="dashboard">
            {tickets.map(ticket => {
                const user = users.find(user => user.id === ticket.userId);
                return (
                    <Card
                        key={ticket.id}
                        id={ticket.id}
                        title={ticket.title}
                        tag={ticket.tag}
                        status={ticket.status}
                        userName={user ? user.name : 'Unknown User'}
                    />
                );
            })}
        </div>
    );
};

export default Dashboard;
