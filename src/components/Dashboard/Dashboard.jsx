import React from 'react';
import Card from '../Card/Card';
import './Dashboard.css'; // Import your CSS file for styles

const Dashboard = ({ tickets, users, grouping, ordering }) => {
    // Mapping priority numbers to their respective names
    const priorityMapping = {
        4: 'Urgent',
        3: 'High',
        2: 'Medium',
        1: 'Low',
        0: 'No priority',
    };

    // Define the order of priorities for display
    const priorityOrder = [4, 3, 2, 1, 0]; // This determines the display order

    // Function to group tickets based on the selected grouping
    const groupTickets = (tickets, grouping) => {
        return tickets.reduce((groups, ticket) => {
            let groupKey;

            // Determine group key based on the grouping type
            if (grouping === "Status") {
                groupKey = ticket.status;
            } else if (grouping === "User") {
                const user = users.find(user => user.id === ticket.userId);
                groupKey = user ? user.name : 'Unknown User';
            } else if (grouping === "Priority") {
                groupKey = priorityMapping[ticket.priority] || 'Unknown';
            }

            // Initialize the group if it doesn't exist
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(ticket);
            return groups;
        }, {});
    };

    // Function to sort tickets based on the selected ordering
    const sortTickets = (tickets, ordering) => {
        return tickets.sort((a, b) => {
            if (ordering === "Priority") {
                return a.priority - b.priority; // Sort by priority (assuming priority is a number)
            } else if (ordering === "Title") {
                return a.title.localeCompare(b.title); // Sort by title
            }
            return 0; // Default case (no sorting)
        });
    };

    // Group and sort the tickets
    const groupedTickets = groupTickets(tickets, grouping);

    // Sort group keys based on priority order if grouping is by Priority
    const sortedGroupKeys = Object.keys(groupedTickets).sort((a, b) => {
        const aPriority = Object.keys(priorityMapping).find(key => priorityMapping[key] === a);
        const bPriority = Object.keys(priorityMapping).find(key => priorityMapping[key] === b);
        
        return (priorityOrder.indexOf(parseInt(aPriority)) - priorityOrder.indexOf(parseInt(bPriority)));
    });

    return (
        <div className="dashboard">
            {sortedGroupKeys.map(groupKey => (
                <div key={groupKey} className="ticket-column">
                    <h3>{groupKey}</h3> {/* Group header (e.g., Status, User, Priority) */}
                    <div className="ticket-cards">
                        {sortTickets(groupedTickets[groupKey], ordering).map(ticket => {
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
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
