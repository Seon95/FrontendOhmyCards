import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import backgroundImage1 from "./images/image1.jpg";
import backgroundImage2 from "./images/image2.jpg";
import backgroundImage3 from "./images/image3.jpg";
import backgroundImage4 from "./images/image4.jpg";
import backgroundImage5 from "./images/image5.jpg";
import backgroundImage6 from "./images/image6.jpg";
import backgroundImage7 from "./images/image7.jpg";
import backgroundImage8 from "./images/image8.png";
import backgroundImage9 from "./images/image9.jpg";

function BackgroundSelector({
  handleBackgroundChange,
  handleCloseBackGroundModal,
}) {
  const handleImageSelect = (image) => {
    handleBackgroundChange(image);
  };

  const imgStyle = {
    width: "90px",
    height: "60px",

    marginBottom: "5px",
    marginLeft: "5px",
  };

  const buttonStyle = {
    backgroundColor: "transparent",
    border: "none",
    padding: "0",
    margin: "0px",
  };

  return (
    <div className="mt-5">
      <Row>
        <Col>
          <Button
            variant="link"
            style={buttonStyle}
            onClick={() => handleImageSelect(backgroundImage1)}
          >
            <img
              className="rounded"
              src={backgroundImage1}
              alt="Background Image 1"
              style={imgStyle}
            />
          </Button>
        </Col>
        <Col>
          <Button
            variant="link"
            style={buttonStyle}
            onClick={() => handleImageSelect(backgroundImage2)}            
          >
            <img
              className="rounded"
              src={backgroundImage2}
              alt="Background Image 2"
              style={imgStyle}
            />
          </Button>
        </Col>
        <Col>
          <Button
            variant="link"
            style={buttonStyle}
            onClick={() => handleImageSelect(backgroundImage3)}
          >
            <img
              className="rounded"
              src={backgroundImage3}
              alt="Background Image 3"
              style={imgStyle}
            />
          </Button>
        </Col>
        <Col>
          <Button
            variant="link"
            style={buttonStyle}
            onClick={() => handleImageSelect(backgroundImage4)}
          >
            <img
              className="rounded"
              src={backgroundImage4}
              alt="Background Image 4"
              style={imgStyle}
            />
          </Button>
        </Col>
        <Col>
          <Button
            variant="link"
            style={buttonStyle}
            onClick={() => handleImageSelect(backgroundImage5)}
          >
            <img
              className="rounded"
              src={backgroundImage5}
              alt="Background Image 5"
              style={imgStyle}
            />
          </Button>
        </Col>
        <Col>
          <Button
            variant="link"
            style={buttonStyle}
            onClick={() => handleImageSelect(backgroundImage6)}
          >
            <img
              className="rounded"
              src={backgroundImage6}
              alt="Background Image 6"
              style={imgStyle}
            />
          </Button>
        </Col>
        <Col>
          <Button
            variant="link"
            style={buttonStyle}
            onClick={() => handleImageSelect(backgroundImage7)}
          >
            <img
              className="rounded"
              src={backgroundImage7}
              alt="Background Image 7"
              style={imgStyle}
            />
          </Button>
        </Col>
        <Col>
          <Button
            variant="link"
            style={buttonStyle}
            onClick={() => handleImageSelect(backgroundImage8)}
          >
            <img
              className="rounded"
              src={backgroundImage8}
              alt="Background Image 8"
              style={imgStyle}
            />
          </Button>
        </Col>
        <Col>
          <Button
            variant="link"
            style={buttonStyle}
            onClick={() => handleImageSelect(backgroundImage9)}
          >
            <img
              className="rounded"
              src={backgroundImage9}
              alt="Background Image 9"
              style={imgStyle}
            />
          </Button>
        </Col>
        
      </Row>
    </div>
  );
}

export default BackgroundSelector;
