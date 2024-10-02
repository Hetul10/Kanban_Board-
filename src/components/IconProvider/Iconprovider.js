// src/IconProvider.js
import React from 'react';

// Icons for statuses
const statusIcons = {
    todo: '../../icons/To-do.svg',         // Replace with actual paths
    backlog: '../../icons/Backlog.svg',   // Replace with actual paths
    inProgress: '../../icons/in-progress.svg', // Replace with actual paths
    done: '../../icons/Done.svg',         // Replace with actual paths
    cancelled: '../../icons/Cancelled.svg', // Replace with actual paths
};

// Icons for priorities
const priorityIcons = {
    4: '../../icons/UrgentPrioritycolor.svg',  // Urgent
    3: '../../icons/HighPriority.svg',    // High
    2: '../../icons/MediumPriority.svg',  // Medium
    1: '../../icons/LowPriority.svg',     // Low
    0: '../../icons/No-priority.svg', // No priority
};

// IconProvider component
const IconProvider = ({ type, iconKey }) => {
    let iconSrc = '';

    if (type === 'status') {
        iconSrc = iconKey ? statusIcons[iconKey.toLowerCase()] : ''; // Convert to lowercase for matching
    } else if (type === 'priority') {
        iconSrc = priorityIcons[iconKey] || '';
    }

    return (
        <img src={iconSrc} alt={`${iconKey} icon`} className="group-icon" />
    );
};

export default IconProvider;
