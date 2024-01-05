import React, { useState } from "react";
import { Card, Accordion } from "react-bootstrap/";
import DelButton from "./DelButton";
import EditButton from "./EditButton";

// import "./darkmode/darkMode.scss";
import {
  Row,
  Container,
  Col,
  Button,
  Offcanvas,
  Stack,
  Modal,
} from "react-bootstrap";

const FancyCards = ({
  link,
  index,
  removeCard,
  userId,
  linkId,
  name,
  description,
  token,
  url,
  handleRerender,
  darkMode,
  selectedIcon,
  onIconChange,
  theme,
  icon,
  colors,
  setColor,
  newColor,
  isActive,
}) => {
  const [cardIcon, setCardIcon] = useState(selectedIcon);
  const [isFlipped, setIsFlipped] = useState(false);

  // const handleIconClick = (icon) => {
  //   setCardIcon(icon);
  //   onIconChange(index, icon);
  // };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center"
        style={{ maxWidth: "500px",minWidth:"400px" }}
      >
        <div
          className="flip-card"
          onClick={handleCardClick}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="flip-card-inner"
            style={{ transform: isFlipped ? "rotateY(180deg)" : "" }}
          >
            <div className="flip-card-front">
              <div
                className="icon rounded"
                // onClick={() => handleIconClick(cardIcon)}
                style={{
                  backgroundColor: `${theme}`,
                }}
              >
                {cardIcon ? (
                  cardIcon
                ) : icon !== "facebook" &&
                  icon !== "instagram" &&
                  icon !== "twitter" &&
                  icon !== "linkedin" &&
                  icon !== "youtube" &&
                  icon !== "tiktok" &&
                  icon !== "reddit" &&
                  icon !== "snapchat" &&
                  icon !== "github" &&
                  icon !== "slack" &&
                  icon !== "discord" &&
                  icon !== "spotify" &&
                  icon !== "apple" &&
                  icon !== "google" &&
                  icon !== "amazon" &&
                  icon !== "skype" &&
                  icon !== "zoom" &&
                  icon !== "soundcloud" ? (
                  <i className="fa fa-user" aria-hidden="true"></i>
                ) : (
                  <i className={`fa fa-${icon}`} aria-hidden="true"></i>
                )}
              </div>
            </div>
            <div
              className="flip-card-back"
              style={{ backgroundColor: darkMode ? "black" : "white" }}
            >
              <div className="icon-back">
                <i className={`fa fa-${icon}`} aria-hidden="true"></i>
              </div>
              <div
                className="content w-100"
                style={{
                  color: darkMode ? "#ff0000" : "black",
                }}
              >
                <h5
                  className="mt-4"
                  // style={{
                  //   color: darkMode ? "#ff0000" : "black",
                  // }}
                >
                  {link.name}
                </h5>

                <div className="description" style={{ fontStyle: "italic" }}>
                  {link.description
                    ? link.description.slice(0, 20) +
                      (link.description.length > 20
                        ? "\n" + link.description.slice(20, 40)
                        : "")
                    : "No description available."}
                </div>

                <a href={link.link} target="_blank">
                  Go to {link.name}
                </a>

                <div className="mt-2" id="card-buttons">
                  <div id="edit-button">
                    <EditButton
                      userId={userId}
                      linkId={link.id}
                      name={link.name}
                      description={link.description}
                      url={link.link}
                      token={token}
                      handleRerender={handleRerender}
                      colors={colors}
                      setColor={setColor}
                      newColor={newColor}
                      isActive={isActive}
                    />
                  </div>

                  <div id="delete-button">
                    <DelButton
                      userId={userId}
                      removeCard={removeCard}
                      linkId={link.id}
                      token={token}
                      handleRerender={handleRerender}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default FancyCards;
