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
import addIcon from '../../icons/add.svg';
import threeDotIcon from '../../icons/threedot.svg';

const Dashboard = ({ tickets, users, grouping, ordering }) => {
    const priorityMapping = {
        4: 'Urgent',
        3: 'High',
        2: 'Medium',
        1: 'Low',
        0: 'No priority',
    };

    const priorityOrder = [4, 3, 2, 1, 0];
    const possibleStatuses = ['Todo', 'In progress', 'Backlog', 'Done', 'Cancelled'];

    const initializeGroups = (grouping) => {
        const groups = {};

        if (grouping === 'Status') {
            possibleStatuses.forEach(status => {
                groups[status] = [];
            });
        } else if (grouping === 'Priority') {
            Object.values(priorityMapping).forEach(priority => {
                groups[priority] = [];
            });
        } else if (grouping === 'User') {
            users.forEach(user => {
                groups[user.name] = [];
            });
        }

        return groups;
    };

    const groupTickets = (tickets, grouping) => {
        const groups = initializeGroups(grouping);

        tickets.forEach(ticket => {
            let groupKey;

            if (grouping === 'Status') {
                groupKey = ticket.status;
            } else if (grouping === 'User') {
                const user = users.find(user => user.id === ticket.userId);
                groupKey = user ? user.name : 'Unknown User';
            } else if (grouping === 'Priority') {
                groupKey = priorityMapping[ticket.priority] || 'Unknown';
            }

            if (groups[groupKey]) {
                groups[groupKey].push(ticket);
            }
        });

        return groups;
    };

    const sortTickets = (tickets, ordering) => {
        return tickets.sort((a, b) => {
            if (ordering === 'Priority') {
                return a.priority - b.priority;
            } else if (ordering === 'Title') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
    };

    const groupedTickets = groupTickets(tickets, grouping);

    const sortedGroupKeys = Object.keys(groupedTickets).sort((a, b) => {
        const aPriority = Object.keys(priorityMapping).find(key => priorityMapping[key] === a);
        const bPriority = Object.keys(priorityMapping).find(key => priorityMapping[key] === b);

        return priorityOrder.indexOf(parseInt(aPriority)) - priorityOrder.indexOf(parseInt(bPriority));
    });

    const statusIcons = {
        Todo: todoIcon,
        'In progress': inProgressIcon,
        Backlog: backlogIcon,
        Done: doneIcon,
        Cancelled: cancelledIcon,
    };

    const priorityIcons = {
        4: urgentIcon,
        3: highIcon,
        2: mediumIcon,
        1: lowIcon,
        0: noPriorityIcon,
    };

    return (
        <div className="dashboard">
            {sortedGroupKeys.map(groupKey => {
                let iconSrc = '';

                if (grouping === 'User') {
                    iconSrc = ''; // UserIcon is handled separately
                } else if (grouping === 'Status') {
                    iconSrc = statusIcons[groupKey] || '';
                } else if (grouping === 'Priority') {
                    const priorityKey = Object.keys(priorityMapping).find(key => priorityMapping[key] === groupKey);
                    iconSrc = priorityIcons[priorityKey] || '';
                }

                return (
                    <div key={groupKey} className="ticket-column">
                        <div className="group-header">
                            {grouping === 'User' ? (
                                <UserIcon
                                    name={groupKey}
                                    available={users.find(user => user.name === groupKey)?.available || false}
                                />
                            ) : (
                                <img src={iconSrc} alt={`${groupKey} icon`} className="group-icon" />
                            )}
                            <div className="group-key-container">
                                <span className="group-key-text">{groupKey}</span>
                                <span className="group-count">{groupedTickets[groupKey].length}</span>
                            </div>
                            <div className="icons-container">
                                <img src={addIcon} alt="Add" className="action-icon" />
                                <img src={threeDotIcon} alt="More options" className="action-icon" />
                            </div>
                        </div>

                        <div className="ticket-cards">
                            {groupedTickets[groupKey].length > 0 ? (
                                sortTickets(groupedTickets[groupKey], ordering).map(ticket => {
                                    const user = users.find(user => user.id === ticket.userId);
                                    const userIcon = user ? user.icon : ''; // Assuming user has an icon property

                                    return (
                                        <Card
                                            key={ticket.id}
                                            id={ticket.id}
                                            title={ticket.title}
                                            tag={ticket.tag}
                                            status={ticket.status}
                                            userName={user ? user.name : 'Unknown User'}
                                            userAvailable={user ? user.available : false} // Pass user availability
                                            icon={grouping === 'Status' ? '' : statusIcons[ticket.status]} // Pass icon only if not grouping by status
                                            grouping={grouping} // Pass the grouping prop
                                            userIcon={userIcon} // Pass the user icon
                                        />
                                    );
                                })
                            ) : (
                                <div className="no-tickets"></div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Dashboard;
