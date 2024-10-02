import React from 'react';
import Card from '../Card/Card';
import UserIcon from '../Usericon/UserIcon';
import './Dashboard.css'; // Import your CSS file for styles

// Import your SVG icons
import todoIcon from '../../icons/To-do.svg';
import backlogIcon from '../../icons/Backlog.svg';
import inProgressIcon from '../../icons/in-progress.svg';
import doneIcon from '../../icons/Done.svg';
import cancelledIcon from '../../icons/Cancelled.svg';

import urgentIcon from '../../icons/UrgentPrioritycolour.svg';
import highIcon from '../../icons/HighPriority.svg';
import mediumIcon from '../../icons/MediumPriority.svg';
import lowIcon from '../../icons/LowPriority.svg';
import noPriorityIcon from '../../icons/No-priority.svg';
import addIcon from '../../icons/add.svg'; // Add this import for add icon
import threeDotIcon from '../../icons/threedot.svg'; // Add this import for three dot icon

const Dashboard = ({ tickets, users, grouping, ordering }) => {
    const priorityMapping = {
        4: 'Urgent',
        3: 'High',
        2: 'Medium',
        1: 'Low',
        0: 'No priority',
    };

    const priorityOrder = [4, 3, 2, 1, 0];

    const groupTickets = (tickets, grouping) => {
        return tickets.reduce((groups, ticket) => {
            let groupKey;

            if (grouping === "Status") {
                groupKey = ticket.status; // Using status directly
            } else if (grouping === "User") {
                const user = users.find(user => user.id === ticket.userId);
                groupKey = user ? user.name : 'Unknown User';
            } else if (grouping === "Priority") {
                groupKey = priorityMapping[ticket.priority] || 'Unknown';
            }

            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(ticket);
            return groups;
        }, {});
    };

    const sortTickets = (tickets, ordering) => {
        return tickets.sort((a, b) => {
            if (ordering === "Priority") {
                return a.priority - b.priority;
            } else if (ordering === "Title") {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
    };

    const groupedTickets = groupTickets(tickets, grouping);

    const sortedGroupKeys = Object.keys(groupedTickets).sort((a, b) => {
        const aPriority = Object.keys(priorityMapping).find(key => priorityMapping[key] === a);
        const bPriority = Object.keys(priorityMapping).find(key => priorityMapping[key] === b);
        
        return (priorityOrder.indexOf(parseInt(aPriority)) - priorityOrder.indexOf(parseInt(bPriority)));
    });

    // Map status and priority to their respective icons
    const statusIcons = {
        Todo: todoIcon,
        'In progress': inProgressIcon, // Exact match
        Backlog: backlogIcon,
        Done: doneIcon,
        Cancelled: cancelledIcon,
    };

    const priorityIcons = {
        4: urgentIcon,  // Urgent
        3: highIcon,    // High
        2: mediumIcon,  // Medium
        1: lowIcon,     // Low
        0: noPriorityIcon, // No priority
    };

    return (
        <div className="dashboard">
            {sortedGroupKeys.map(groupKey => {
                let iconSrc = '';

                // Determine which icon to use based on the grouping type
                if (grouping === "User") {
                    iconSrc = ''; // Use UserIcon separately
                } else if (grouping === "Status") {
                    console.log(`Checking Status: ${groupKey}`); // Debugging output
                    iconSrc = statusIcons[groupKey] || ''; // Ensure matching keys
                    console.log(`Status Icon Source: ${iconSrc}`); // Debugging output
                } else if (grouping === "Priority") {
                    const priorityKey = Object.keys(priorityMapping).find(key => priorityMapping[key] === groupKey);
                    console.log(`Checking Priority: ${groupKey}, Found Key: ${priorityKey}`); // Debugging output
                    iconSrc = priorityIcons[priorityKey] || '';
                    console.log(`Priority Icon Source: ${iconSrc}`); // Debugging output
                }

                return (
                    <div key={groupKey} className="ticket-column">
                        <div className="group-header">
    {grouping === "User" ? (
        <UserIcon
            name={groupKey}
            available={users.find(user => user.name === groupKey)?.available || false}
        />
    ) : (
        <img src={iconSrc} alt={`${groupKey} icon`} className="group-icon" />
    )}
    <div className="group-key-container">
        <span className="group-key-text">{groupKey}</span>
        <span className="group-count">{groupedTickets[groupKey].length}</span> {/* Display ticket count */}
    </div>
    <div className="icons-container">
        <img src={addIcon} alt="Add" className="action-icon" />
        <img src={threeDotIcon} alt="More options" className="action-icon" />
    </div>
</div>

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
                );
            })}
        </div>
    );
};

export default Dashboard;
