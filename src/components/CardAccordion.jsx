import React, { useState } from "react";
import { Card, Accordion } from "react-bootstrap/";
import DelButton from "./DelButton";

const CardAccordion = ({ link, index, removeCard, token }) => {
  const eventKey = `accordion-${index}`;

  return (
    <Accordion>
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header> {link.name}</Accordion.Header>
        <Accordion.Body>
          <div> {link.description || "No description available."}</div>

          <div>
            <a href={link.link}>Go to my {link.name}</a>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default CardAccordion;
