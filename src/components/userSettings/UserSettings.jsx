import React, { useState } from "react";
import { Button, Stack, InputGroup, FormControl } from "react-bootstrap/";
import ChangePasswordModal from "./ChangePasswordModal";
import BackgroundSelector from "./BackgroundSelector";
import ChangeInfo from "./ChangeInfo";
import ChangePic from "./ChangePic";
import "../darkmode/darkMode.scss";

function UserSettings({
  userId,
  token,
  setImageUrl,
  setUserName,
  handleBackgroundChange,
  backgroundImage,
  handleRerender,
  userName,
  userBio,
  darkMode,
  setUserBio,
}) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPicModal, setShowPicModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showBackGroundModal, setBackGroundModal] = useState(false);
  const [profileLink, setProfileLink] = useState(null);

  const handlePasswordClick = () => {
    setShowPasswordModal(true);
  };

  const handleBackgroundClick = () => {
    setBackGroundModal(true);
  };
  const handlePicClick = () => {
    setShowPicModal(true);
  };

  const handleInfoClick = () => {
    setShowInfoModal(true);
  };

  const handleShareProfileClick = () => {
    const link = `https://frontend-ohmy-cards-yv2r.vercel.app/${userId}`;
    setProfileLink(link);
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
  };

  const handleClosePicModal = () => {
    setShowPicModal(false);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
  };
  const handleCloseBackGroundModal = () => {
    setBackGroundModal(false);
  };

  return (
    <div>
      <Stack spacing={3} gap={3}>
        <Button
          onClick={handleInfoClick}
          className="text-center"
          variant={darkMode ? "light" : "secondary"}
        >
          Edit Profile
        </Button>
        <Button
          onClick={handleShareProfileClick}
          className="text-center"
          variant={darkMode ? "light" : "secondary"}
        >
          Share My Profile
        </Button>
        <Button
          onClick={handlePicClick}
          className="text-center"
          variant={darkMode ? "light" : "secondary"}
        >
          Profile Picture
        </Button>
        <Button
          onClick={handlePasswordClick}
          className="text-center "
          variant={darkMode ? "light" : "secondary"}
        >
          Change Password
        </Button>
        <Button
          onClick={handleBackgroundClick}
          className="text-center"
          variant={darkMode ? "light" : "secondary"}
        >
          Edit Background Image
        </Button>
      </Stack>

      {profileLink && (
        <InputGroup className="my-3">
          <FormControl
            value={profileLink}
            readOnly
            onClick={() => navigator.clipboard.writeText(profileLink)}
          />
          <Button
            variant="outline-secondary"
            onClick={() => navigator.clipboard.writeText(profileLink)}
          >
            Copy Link
          </Button>
        </InputGroup>
      )}

      {showPasswordModal && (
        <ChangePasswordModal
          token={token}
          userId={userId}
          handleClose={handleClosePasswordModal}
        />
      )}
      {showPicModal && (
        <ChangePic
          token={token}
          userId={userId}
          handleClose={handleClosePicModal}
          setImageUrl={setImageUrl}
        />
      )}
      {showInfoModal && (
        <ChangeInfo
          token={token}
          userId={userId}
          handleClose={handleCloseInfoModal}
          setUserName={setUserName}
          setUserBio={setUserBio}
          handleRerender={handleRerender}
          userName={userName}
          userBio={userBio}
        />
      )}

      {showBackGroundModal && (
        <BackgroundSelector
          token={token}
          userId={userId}
          handleClose={handleCloseBackGroundModal}
          setUserName={setUserName}
          handleBackgroundChange={handleBackgroundChange}
        />
      )}
    </div>
  );
}

export default UserSettings;
