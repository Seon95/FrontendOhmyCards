import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { BsFillTrashFill } from "react-icons/bs";

const DelButton = ({ linkId, userId, token, handleRerender }) => {
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://www.marouansahli.website/api/users/${userId}/urls/${linkId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsDeleted(true);
        setFeedbackMessage("Card deleted successfully!");
        handleCloseModal();
        handleRerender();
      } else {
        console.log("Failed to delete card");
        setFeedbackMessage("Failed to delete card");
        handleRerender();
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error deleting card:", error);
      setFeedbackMessage("Error deleting card");
      handleRerender();
      handleCloseModal();
    }
  };

  if (isDeleted) {
    return (
      <div className="alert alert-success mt-3" role="alert">
        {deleteMessage}
      </div>
    );
  }

  return (
    <div>
      {feedbackMessage && (
        <div className="alert alert-info mt-3" role="alert">
          {feedbackMessage}
        </div>
      )}
      <button id="del-button" className="btn " onClick={handleShowModal}>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash3-fill"
          viewBox="0 0 16 16"
        >
          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
        </svg> */}
        <BsFillTrashFill />
      </button>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        style={{
          backdropFilter: "blur(2px)",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sure?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Do you sure to{" "}
            <span style={{ textDecoration: "underline", color: "red" }}>
              delete
            </span>{" "}
            this social media card from your library?
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" type="submit" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DelButton;
