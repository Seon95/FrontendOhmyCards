import React, { useState } from "react";
import ColorItem from "./ColorItem";
import {
  Button,
  Modal,
  Container,
  Row,
  Col,
  Stack,
  Form,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import axios from "axios";

const AddButton = ({
  addCard,
  userId,
  token,
  handleRerender,
  colors,
  setColor,
  newColor,
}) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(false);
  const [url, setUrl] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedColorStyle, setSelectedColorStyle] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleNameChange = (event) => setName(event.target.value);
  // const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleDescriptionChange = (event) => {
    const inputValue = event.target.value;
    const firstLine = inputValue.slice(0, 20);
    const secondLine = inputValue.slice(20, 40);

    // Do something with the two lines of input
    console.log("First line:", firstLine);
    console.log("Second line:", secondLine);

    setDescription(inputValue);
  };

  const handleActiveChange = (event) => {
    if (event.target.checked) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  const [showUrlModified, setShowUrlModified] = useState(false);

  const handleUrlChange = (event) => {
    const urlValue = event.target.value;
    const pattern = /^https?:\/\//i;
    const startsWithHttp = pattern.test(urlValue);
    if (urlValue !== "" && !startsWithHttp) {
      setUrl("https://www." + urlValue);
      setShowUrlModified(true);
    } else {
      setUrl(urlValue);
      setShowUrlModified(false);
    }
  };

  const handleColorChange = (kleur) => {
    setSelectedColor(kleur);
    setShowDropdown(false);
    setSelectedColorStyle({ backgroundColor: kleur });
  };

  const handleSave = async () => {
    try {
      console.log("this is tokenz" + token);
      const response = await axios.post(
        `https://marouanapp.000webhostapp.com/api/users/${userId}`,
        {
          name,
          isActive: active,
          link: url,
          theme: selectedColor,
          icon: name.toLowerCase(),
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      addCard(response.data); // update the state in the parent component
      console.log("newcolor" + newColor);
      setName("");
      setActive(false);
      setUrl("");
      setSelectedColor("");
      setDescription("");

      handleClose();
      handleRerender();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Name does not match with the domain.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };
  return (
    <Row>
      <Button variant={"secondary"} onClick={handleShow}>
        Add Link
      </Button>
      <Col className="text-center">
        <Modal
          show={show}
          onHide={handleClose}
          style={{
            backdropFilter: "blur(2px)",
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>New Card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Which platform do you want to add?</Form.Label>
                <Form.Control
                  placeholder="Enter name..."
                  autoFocus
                  onChange={handleNameChange}
                  id="name"
                  name="name"
                  value={name}
                  type="text"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="basic-url">
                  Your account address:
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Enter url..."
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    onChange={handleUrlChange}
                    name="url"
                    value={url}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  maxLength={40}
                  placeholder="Enter description..."
                  id="description"
                  name="description"
                  onChange={handleDescriptionChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 d-flex ">
                <Form.Label className="mt-2">
                  Select a fitting color for your card:
                </Form.Label>

                <Dropdown
                  className="color-switcher"
                  show={showDropdown}
                  onToggle={setShowDropdown}
                >
                  <Dropdown.Toggle
                    variant="secondary"
                    id="color-dropdown"
                    style={{ marginLeft: "15px" }}
                  >
                    {selectedColor ? (
                      <div
                        style={{
                          width: "130px",
                          height: "1.8rem",
                          backgroundColor: selectedColor,
                          display: "inline-block",
                          borderRadius: "20px",
                          padding: "0",
                        }}
                      ></div>
                    ) : (
                      <div style={{ display: "inline-block" }}>
                        Select a color
                      </div>
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    style={{ backgroundColor: "transparent", border: "none" }}
                  >
                    {colors.map((color, index) => (
                      <ColorItem
                        key={index}
                        color={color}
                        newColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                        handleColorChange={handleColorChange}
                      />
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              <Form.Group className="mb-3">
                <label className="lns-checkbox">
                  <input
                    type="checkbox"
                    onChange={handleActiveChange}
                    checked={active}
                  />
                  <span>Active</span>
                </label>
                {/* <Form.Check
                  type="checkbox"
                  label="Active"
                  onChange={handleActiveChange}
                  checked={active}
                /> */}
              </Form.Group>
            </Form>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
      {selectedColor && (
        <Col className="text-center mt-3">
          <div
            className="selected-color"
            style={{ backgroundColor: selectedColor }}
          ></div>
        </Col>
      )}
    </Row>
  );
};

export default AddButton;
