import React, { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import {
  Row,
  Container,
  Col,
  Button,
  Offcanvas,
  Stack,
  Modal,
} from "react-bootstrap";
const LogoutModal = ({ handleLogout, isLoading }) => {
  const [show, setShow] = useState(false);
  const handleCloseLogout = () => setShow(false);
  const handleShowLogout = () => {
    setShow(true);
  };
  const handleLogoutAndRedirect = async () => {
    await handleLogout();
    window.location.replace("https://s10.syntradeveloper.be/");
  };

  return (
    <Container>
      <Stack>
        <Button variant="secondary" onClick={handleShowLogout}>
          Logout
        </Button>
        <Modal show={show} onHide={handleCloseLogout}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure u want to logout?</Modal.Title>
          </Modal.Header>
          <Modal.Body>We're sad to see you go....</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseLogout}>
              Never mind
            </Button>
            <Button variant="dark" onClick={handleLogoutAndRedirect}>
              Yes, im sure
            </Button>
          </Modal.Footer>
        </Modal>
      </Stack>
      <ScaleLoader
        color={"#36d7b7"}
        loading={isLoading}
        size={100}
        className="d-flex justify-content-center"
      />
    </Container>
  );
};
export default LogoutModal;
