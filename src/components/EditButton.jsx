import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup, Dropdown } from "react-bootstrap";
import axios from "axios";
import ColorItem from "./ColorItem";
import { BsPencilFill } from "react-icons/bs";

const EditButton = ({
  userId,
  linkId,
  token,
  handleRerender,
  name,
  url,
  description,
  isActive,
  colors,
  setColor,
  newColor,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState(newColor || "");
  const [formValues, setFormValues] = useState({
    name: name,
    url: url,
    description: description,
    isActive,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setErrorMessage("");
  };
  useEffect(() => {
    setFormValues({
      name: name,
      url: url,
      description: description,
      isActive: isActive,
    });
  }, [isActive, name, url, description]);

  function handleUrlChange(e) {
    const value = e.target.value.trim();
    let formattedUrl = value;

    // Check if the URL already contains "http://" or "https://"
    if (!value.includes("http://") && !value.includes("https://")) {
      formattedUrl = "https://" + value;
    }

    setFormValues({
      ...formValues,
      url: formattedUrl,
    });
  }
  useEffect(() => {
    setFormValues({
      name: name,
      url: url,
      description: description,
      isActive: isActive,
    });
  }, [isActive, name, url, description]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    // Ensure that the checked value is a boolean
    const isChecked =
      typeof checked === "boolean" ? checked : checked === "true";

    setFormValues({
      ...formValues,
      [name]: isChecked ? 1 : 0,
    });
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setShowDropdown(false);
  };

  const handleSave = () => {
    const data = {
      name: formValues.name,
      link: formValues.url,
      description: formValues.description,
      isActive: formValues.isActive,
    };
    if (selectedColor) {
      data.theme = selectedColor;
    }
    axios
      .put(
        `https://www.marouansahli.website/api/users/${userId}/urls/${linkId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        handleCloseModal();
        handleRerender();
        console.log("old color" + newColor);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 400) {
          setErrorMessage("Name does not match with the domain.");
        } else {
          setErrorMessage("An error occurred. Please try again later");
        }
      });
  };

  return (
    <div className="ms-auto ">
      <button
        id="edit-button"
        className="btn  ms-auto"
        onClick={handleShowModal}
      >
        <BsPencilFill />
      </button>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        style={{
          backdropFilter: "blur(2px)",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change your media card's information</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Which platform do you want to add?</Form.Label>
              <Form.Control
                placeholder="Enter name..."
                autoFocus
                id="name"
                name="name"
                type="text"
                value={formValues.name}
                onChange={handleInputChange}
                readOnly // added readOnly attribute
                style={{
                  backgroundColor: "#e9ecef",
                  color: "#6c757d",
                  cursor: "not-allowed",
                }} // added style to indicate that the field is not editable
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="basic-url">Your account address:</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Please remove 'www.'"
                  id="new-url"
                  name="url"
                  aria-describedby="new-addon3"
                  value={formValues.url}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                // as="textarea"
                rows={3}
                placeholder="Enter description..."
                id="description"
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                style={{ height: "100px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3 d-flex ">
              <Form.Label className="mt-2 me-2">
                Select a fiting color to you card:{" "}
              </Form.Label>
              <Dropdown
                className="color-switcher"
                show={showDropdown}
                onToggle={setShowDropdown}
              >
                <Dropdown.Toggle variant="secondary" id="color-dropdown">
                  {selectedColor ? (
                    <div
                      style={{
                        width: "130px",
                        height: "1.8rem",
                        backgroundColor: selectedColor,
                        display: "inline-block",
                        borderRadius: "20px",
                      }}
                    ></div>
                  ) : (
                    <div
                      style={{ display: "inline-block", marginRight: "10px" }}
                    >
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
                      style={{ backgroundColor: "transparent" }}
                    />
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="isActive"
                name="isActive"
                label="Active"
                checked={formValues.isActive}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
          </Form>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" type="submit" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditButton;
