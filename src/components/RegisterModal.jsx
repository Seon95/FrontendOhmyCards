import React, { useState } from "react";
import { Modal, Button, Form, Alert, FloatingLabel } from "react-bootstrap";

const RegisterModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      setPasswordsMatch(false);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://marouansahli.website/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      // TODO: handle successful registration
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
      setShowModal(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setPasswordsMatch(true);
  };

  return (
    <>
      <Button
        className="me-2"
        variant="dark"
        onClick={() => setShowModal(true)}
      >
        Register
      </Button>

      <Modal className="mt-5" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="formName" label="Name" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="formEmail"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Enter E-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="formPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="formPasswordConfirmation"
              label="Confirm Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="formDescription"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </FloatingLabel>

            {!passwordsMatch && (
              <Alert variant="danger">Passwords do not match.</Alert>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            <Button
              className="btn-lg d-flex mx-auto"
              variant="dark"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterModal;
