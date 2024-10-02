import React, { useState, useEffect, useRef } from "react";
import "./TopNav.css"; 


import displayIcon from '../../icons/Display.svg'; 
import dropdownIcon from '../../icons/down.svg'; 

const TopNav = ({ onGroupChange, onOrderChange }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [grouping, setGrouping] = useState("Status");
  const [ordering, setOrdering] = useState("Priority");
  const dropdownRef = useRef(null); 

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleGroupChange = (e) => {
    setGrouping(e.target.value);
    onGroupChange(e.target.value); 
    localStorage.setItem("grouping", e.target.value); 
  };

  const handleOrderChange = (e) => {
    setOrdering(e.target.value);
    onOrderChange(e.target.value); 
    localStorage.setItem("ordering", e.target.value); 
  };

  
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
   
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
    
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    
    const storedGrouping = localStorage.getItem("grouping");
    const storedOrdering = localStorage.getItem("ordering");

    if (storedGrouping) {
      setGrouping(storedGrouping);
      onGroupChange(storedGrouping); 
    }
    if (storedOrdering) {
      setOrdering(storedOrdering);
      onOrderChange(storedOrdering);
    }
  }, [onGroupChange, onOrderChange]); 

  return (
    <div className="topNav">
      <div className="dropdownWrapper" ref={dropdownRef}>
        <button className="displayButton" onClick={toggleDropdown}>
          <img src={displayIcon} alt="Display Icon" className="icon-left" />
          Display
          <img src={dropdownIcon} alt="Dropdown Icon" className="icon-right" />
        </button>
        {dropdownVisible && (
          <div className="dropdownContent">
            <div className="dropdownItem">
              <label>Grouping</label>
              <select value={grouping} onChange={handleGroupChange}>
                <option value="Status">Status</option>
                <option value="User">User</option>
                <option value="Priority">Priority</option>
              </select>
            </div>
            <div className="dropdownItem">
              <label>Ordering</label>
              <select value={ordering} onChange={handleOrderChange}>
                <option value="Priority">Priority</option>
                <option value="Title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
