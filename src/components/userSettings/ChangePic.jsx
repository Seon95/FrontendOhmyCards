import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ChangePic({ handleClose, userId, setImageUrl, token }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await fetch(
          `https://marouansahli.website/api/users/${userId}/pic`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setImageUrl(data.image);
          handleClose();
          setSuccessMessage("Profile picture changed successfully!");
        } else {
          throw new Error(`HTTP error: ${response.status}`);
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while uploading the image.");
      }
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError("");
  };

  return (
    <Modal
      show={true}
      onHide={handleClose}
      style={{
        backdropFilter: "blur(5px)",
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Change Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="profile-pic" className="form-label">
              Upload Profile Picture
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          <hr />
          <Button variant="dark" type="submit" className="me-2 w-100">
            Save
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ChangePic;
