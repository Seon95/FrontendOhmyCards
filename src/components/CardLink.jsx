import React, { useState } from "react";
import { Col, Container, Row, Card, Modal } from "react-bootstrap";
import axios from "axios";
import DelButton from "./DelButton";

const CardLink = ({ link, index, removeCard }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Container>
      <Row>
        <Card
          className="d-flex flex-md-row align-items-sm-center"
          id="card-item"
          onClick={toggleExpand}
          style={{
            cursor: "pointer",
            width: "700px",
            minHeight: "80px",
            backgroundColor: "#212529",
          }}
        >
          <Col>
            <Card.Body>
              <Card.Title>{link.name}</Card.Title>

              {expanded && (
                <div>
                  {" "}
                  <Card.Text className="text-wrap">
                    {link.description || "No description available."}
                  </Card.Text>
                  <Card.Link href={link.link}>Go to my {link.name}</Card.Link>
                  <div className="d-flex justify-content-end">
                    <DelButton
                      index={index}
                      removeCard={removeCard}
                      linkId={link.id}
                    />
                  </div>
                </div>
              )}
            </Card.Body>
          </Col>
        </Card>
      </Row>
    </Container>
  );
};

export default CardLink;
