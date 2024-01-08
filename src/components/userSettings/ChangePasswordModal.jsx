import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";

function ChangePasswordModal({ userId, token, handleClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [feedback, setFeedback] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handleChangePassword = () => {
    const data = {
      old_password: currentPassword,
      password: newPassword,
      password_confirmation: newPasswordAgain,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(
        `https://marouanapp.000webhostapp.com/api/users/${userId}/pass`,
        data,
        config
      )
      .then((response) => {
        console.log(response.data); // You can do something with the response data here
        setFeedback("Password has been changed");
        setPasswordChanged(true);
      })
      .catch((error) => {
        console.error(error);
        setFeedback("Failed to change password");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleChangePassword();
  };

  return (
    <div>
      <Modal
        show={!passwordChanged}
        onHide={handleClose}
        style={{
          backdropFilter: "blur(5px)",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column" onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingPassword"
              label="Current Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPassword"
              label="New Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="New Password">
              <Form.Control
                type="password"
                placeholder="New Password Again"
                value={newPasswordAgain}
                onChange={(e) => setNewPasswordAgain(e.target.value)}
              />
            </FloatingLabel>

            <Button variant="dark" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
          <div>{feedback}</div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default ChangePasswordModal;
