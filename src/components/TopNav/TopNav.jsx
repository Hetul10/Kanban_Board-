import React, { useState, useEffect, useRef } from "react";
import "./TopNav.css"; // Import your CSS file

const TopNav = ({ onGroupChange, onOrderChange }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [grouping, setGrouping] = useState("Status");
  const [ordering, setOrdering] = useState("Priority");
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleGroupChange = (e) => {
    setGrouping(e.target.value);
    onGroupChange(e.target.value); // Pass the grouping option to parent
  };

  const handleOrderChange = (e) => {
    setOrdering(e.target.value);
    onOrderChange(e.target.value); // Pass the ordering option to parent
  };

  // Close the dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="topNav">
      <div className="dropdownWrapper" ref={dropdownRef}> {/* Attach ref here */}
        <button className="displayButton" onClick={toggleDropdown}>
          Display
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
