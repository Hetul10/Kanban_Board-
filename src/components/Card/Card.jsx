import React from 'react';
import './Card.css';
import UserIcon from '../Usericon/UserIcon';

const Card = ({ id, title, tag, status, userName, userAvailable, icon, grouping, userIcon }) => {
    return (
        <div className="cardContainer">
            <div className="cardHeading">
                <span className="cardId">{id}</span>
                <div className="imageContainer">
                    {/* Only display the user icon if not grouping by User */}
                    {grouping !== 'User' && (
                        <UserIcon name={userName} icon={userIcon} />
                    )}
                    <div className={`showStatus ${userAvailable ? 'available' : 'unavailable'}`}></div>
                </div>
            </div>
            <div className="cardTitle">
                {/* Wrap title and status icon in a flex container */}
                <div className="title-container">
                    {/* Only display the icon if not grouping by status */}
                    {grouping !== 'Status' && icon && (
                        <img src={icon} alt={`${status} icon`} className="status-icon" />
                    )}
                    <p className="title">{title}</p>
                </div>
            </div>
            <div className="cardTags">
                {tag?.map((elem, index) => (
                    <div key={index} className="tags">
                        <span>•</span> {elem}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;
