import React, { useState } from "react";
import Footer from "./Footer";

// import "./darkmode/darkMode.scss";
import { Container } from "react-bootstrap";

const FancyCards = ({
  link,
  index,
  darkMode,
  selectedIcon,
  onIconChange,
  theme,
  icon,
}) => {
  const [cardIcon, setCardIcon] = useState(selectedIcon);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleIconClick = (icon) => {
    setCardIcon(icon);
    onIconChange(index, icon);
  };
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
        style={{ maxWidth: "500px" }}
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
                onClick={() => handleIconClick(cardIcon)}
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
                <h5 className="mt-4">{link.name}</h5>
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
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default FancyCards;
