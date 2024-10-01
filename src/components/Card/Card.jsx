import React from 'react';
import './Card.css';

const Card = ({ id, title, tag , status }) => {
  return (
    <div className="cardContainer">
      <div className="cardHeading">
        <span className="cardId">{id}</span>
        <div className="imageContainer">
          <img
            className="userImage"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
            alt="UserImage"
          />
          <div className="showStatus"></div>
        </div>
      </div>
      <div className="cardTitle">
        <p className='title'>{title}</p>
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
