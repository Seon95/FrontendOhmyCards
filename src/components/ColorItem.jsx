import React from "react";

const ColorItem = ({
  color,
  setColor,
  setSelectedColor,
  newColor,
  onClick,
  handleColorChange,
}) => {
  const handleClick = () => {
    handleColorChange(color);
  };
  return (
    <div 
      style={{width: "135px", marginTop: "2px"}}
    >
      <div
        className={`color-item ${newColor === color ? "selected" : ""}`}
        style={{ "--bg-color": color }}
        onClick={() => handleClick()}
      ></div>
    </div>
  );
};

export default ColorItem;
