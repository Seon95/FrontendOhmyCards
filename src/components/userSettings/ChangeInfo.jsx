import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ChangeInfo({
  userName,
  userBio,
  token,
  userId,
  handleClose,
  handleRerender,
  setUserName,
  setUserBio,
}) {
  const [newUserName, setNewUserName] = useState(userName);
  const [newUserBio, setNewUserBio] = useState(userBio);

  const handleUserNameChange = (event) => {
    setNewUserName(event.target.value);
  };

  const handleUserBioChange = (event) => {
    setNewUserBio(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedData = {};
      if (newUserName !== userName) {
        updatedData.userName = newUserName;
        localStorage.setItem("userName", newUserName);
        setUserName(newUserName); // Call the setUserName function from props
      }

      if (newUserBio !== userBio) {
        updatedData.description = newUserBio;
        localStorage.setItem("userBio", newUserBio);
        setUserBio(newUserBio); // Update the value of userBio in App state
      }

      const response = await fetch(
        `https://marouansahli.website/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );
      const data = await response.json();
      console.log(data);

      handleClose();
      handleRerender();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      show={true}
      onHide={handleClose}
      style={{
        backdropFilter: "blur(2px)",
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Change Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new username"
              value={newUserName}
              onChange={handleUserNameChange}
            />
          </Form.Group>
          <Form.Group controlId="formUserBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new bio"
              value={newUserBio}
              onChange={handleUserBioChange}
            />
          </Form.Group>
          <Button className="mt-3 w-100" variant="dark" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ChangeInfo;
