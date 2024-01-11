import React, { useState, useEffect } from "react";
import { Row, Container, Col } from "react-bootstrap";
import axios from "axios";
import GuestsFancyCards from "./GuestsFancyCards";
import Header2 from "./Header2";

const GuestCards = ({
  userId2,
  token,
  rerender,
  handleRerender,
  selectedIcon,
  userId,
}) => {
  const [showGuestCards, setShowGuestCards] = useState([]);
  const [userName2, setUserName] = useState("");
  const [userBio2, setUserBio] = useState("");
  console.log(userId2 + "jj");
  useEffect(() => {
    const fetchLinks2 = async () => {
      try {
        const response = await axios.get(
          `https://marouansahli.website/api/users/${userId2}`
        );
        console.log("test" + response);

        setShowGuestCards(response.data.url);
        setUserName(response.data.userName);
        setUserBio(response.data.description);
      } catch (error) {
        console.error(error);
      }
    };
    console.log(userId2);

    fetchLinks2();
  }, [userId2, rerender]); // add rerender to the dependency array of useEffect

  return (
    <>
      <Header2 userId2={userId2} userName2={userName2} userBio2={userBio2} />
      <Container>
        <Row
          // xs={1}
          // md={2}
          // lg={3}
          // xl={3}
          // xxl={4}
          // gap={1}
          className="d-flex justify-content-center"
        >
          <div id="card-grid">
            {showGuestCards
              .filter((card) => card.isActive === 1)
              .map((link, index) => {
                return (
                  <Col key={index} className="mb-3">
                    <GuestsFancyCards
                      link={link}
                      index={index}
                      userId2={userId2}
                      linkId={link.id}
                      name={link.name}
                      description={link.description}
                      url={link.link}
                      token={token}
                      handleRerender={handleRerender}
                      selectedIcon={selectedIcon}
                      theme={link.theme}
                      icon={link.icon}
                    />
                  </Col>
                );
              })}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default GuestCards;
