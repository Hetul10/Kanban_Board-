import React from 'react';
import Card from '../Card/Card';

const Dashboard = () => {
  
  const tickets = [
    {
      id: "CAM-1",
      title: "Update User Profile Page UI",
      tag: ["Feature Request", "UI"],
      status: "Todo"
    },
    {
      id: "CAM-2",
      title: "Add Multi-Language Support",
      tag: ["Feature Request"],
      status: "In progress"
    },
    {
      id: "CAM-3",
      title: "Optimize Database Queries for Performance",
      tag: ["Feature Request", "Performance"],
      status: "In progress"
    }
  ];

  return (
    <div className="dashboard">
      {tickets.map(ticket => (
        <Card
          key={ticket.id}
          id={ticket.id}
          title={ticket.title}
          tag={ticket.tag} 
          status={ticket.status} 
        />
      ))}
    </div>
  );
};

export default Dashboard;
// // TicketList.js
// import React from 'react';

// const TicketList = ({ groupBy, sortBy }) => {
//     const tickets = [
//         // Your ticket data
//         { id: "CAM-1", title: "Update User Profile Page UI", user: "Anoop Sharma", status: "Todo", priority: 4 },
//         { id: "CAM-2", title: "Add Multi-Language Support", user: "Yogesh", status: "In Progress", priority: 3 },
//         { id: "CAM-3", title: "Optimize Database Queries", user: "Yogesh", status: "In Progress", priority: 1 },
//         // Add more tickets as needed
//     ];

//     // Function to group tickets
//     const groupTickets = (tickets) => {
//         return tickets.reduce((groups, ticket) => {
//             const key = ticket[groupBy];
//             if (!groups[key]) {
//                 groups[key] = [];
//             }
//             groups[key].push(ticket);
//             return groups;
//         }, {});
//     };

//     // Function to sort tickets
//     const sortTickets = (tickets) => {
//         return tickets.sort((a, b) => {
//             if (sortBy === 'priority') {
//                 return b.priority - a.priority; // Descending order
//             } else if (sortBy === 'title') {
//                 return a.title.localeCompare(b.title); // Ascending order
//             }
//             return 0;
//         });
//     };

//     // Group and sort tickets
//     const groupedTickets = groupTickets(tickets);
//     const sortedGroupedTickets = Object.keys(groupedTickets)
//         .map(key => ({
//             group: key,
//             tickets: sortTickets(groupedTickets[key]),
//         }));

//     return (
//         <div>
//             {sortedGroupedTickets.map(({ group, tickets }) => (
//                 <div key={group}>
//                     <h2>{group}</h2>
//                     {tickets.map(ticket => (
//                         <div key={ticket.id} className="ticket">
//                             <h3>{ticket.title}</h3>
//                             <p>User: {ticket.user}</p>
//                             <p>Status: {ticket.status}</p>
//                             <p>Priority: {ticket.priority}</p>
//                         </div>
//                     ))}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default TicketList;
