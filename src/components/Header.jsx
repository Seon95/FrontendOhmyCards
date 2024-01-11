import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Figure from "react-bootstrap/Figure";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Header = ({ userName, userBio, userId, rerender, handleRerender }) => {
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const response = await fetch(
          `https://marouansahli.website/api/users/${userId}/pic`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setUserImage(imageUrl);
      } catch (error) {
        console.error("Error fetching user image:", error);
        // Handle the error or set a default image
        setUserImage("/profilePicTest.png");
      }
    };

    fetchUserImage();
  }, [userId, handleRerender]);

  return (
    <div className="header-container">
      <Container className="text-center">
        <Row className="justify-content-center">
          <Col sm="auto">
            <Figure id="profile-pic">
              <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src={userImage || "/profilePicTest.png"}
                style={{ borderRadius: "50%" }}
              />
              <Figure.Caption className="text-center">
                <h1 id="username">{userName}</h1>
              </Figure.Caption>
            </Figure>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm="auto">
            <p style={{ color: "white" }}>{userBio}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
