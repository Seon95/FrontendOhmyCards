import Header from "./components/Header";
import ListArea from "./components/ListArea";
import Footer from "./components/Footer";
import LoginButton from "./components/LoginButton";
import React, { useState, useEffect } from "react";
import RegisterModal from "./components/RegisterModal";
import NotLoggedIn from "./components/NotLoggedIn";
import "./components/darkmode/darkMode.scss";
import UserSettings from "./components/userSettings/UserSettings";
import { Row, Container, Col, Button, Offcanvas, Stack } from "react-bootstrap";
import { FaYoutube, FaTwitter, FaFacebook } from "react-icons/fa";
import Swal from "sweetalert2";

// import BackdropFilter from "react-backdrop-filter";
// import { useNavigate } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [show, setShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [token, setToken] = useState("");
  const [userImage, setUserImage] = useState("");
  const [rerender, setRerender] = useState(0);
  const icons = [<FaYoutube />, <FaTwitter />, <FaFacebook />];
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedBackgroundImage, setSelectedBackgroundImage] = useState("");
  const [newColor, setNewcolor] = useState("");
  const [userId2, setUserId2] = useState("");

  // const navigate = useNavigate();

  const colors = [
    "#2d3436",
    "#be2edd",
    "#f9ca24",
    "#00D856",
    "#3b579d",
    "#0274B3",
    "#ff0000",
    "#F97637",
  ];
  useEffect(() => {
    const currentColor = localStorage.getItem("color");
  }, []);

  // const setTheme = (color) => {
  //   document.documentElement.style.setProperty("--bg-color", color);
  // };
  const setColor = (event) => {
    const currentColor = event.target.style.getPropertyValue("--bg-color");

    setNewcolor(currentColor);

    localStorage.setItem("color", currentColor);
  };

  const handleIconChange = (icon) => {
    setSelectedIcon(icon);
    localStorage.setItem("selectedIcon", JSON.stringify(icon));
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const userId = url.pathname.split("/")[1];
    setUserId2(userId);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const storedUserEmail = localStorage.getItem("userEmail");
    const storedUserName = localStorage.getItem("userName");
    const storedUserBio = localStorage.getItem("userBio");
    const darkModeSetting = localStorage.getItem("darkMode");
    if (storedToken && storedUserId) {
      setToken(storedToken);
      setLoggedIn(true);
      setUserId(storedUserId);
      setUserEmail(storedUserEmail);
      setUserName(storedUserName);
      setUserBio(storedUserBio);
      setDarkMode(JSON.parse(darkModeSetting));
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userBio", userBio);
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
      localStorage.removeItem("userBio");
    }
  }, [loggedIn, token, userId, userEmail, userName, userBio, darkMode]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRerender = () => {
    setRerender(rerender + 1);
    console.log("rerendered");
  };

  const handleLogin = (data) => {
    setLoggedIn(true);
    setUserId(data.user.id);
    setUserName(data.user.userName);
    setUserEmail(data.user.email);
    setUserBio(data.user.description);
    setToken(data.token);
    console.log(userId2);
    localStorage.setItem("userId", data.user.id);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setLoggedOut(true);
    setUserEmail("");
    setToken("");
    setUserId(null);
    setUserName("");
    setUserBio("");

    localStorage.removeItem("userId");
  };

  const handleUserImageChange = (imageUrl) => {
    setUserImage(imageUrl);
  };

  const handleBackgroundChange = (imageUrl) => {
    setSelectedBackgroundImage(imageUrl);
    localStorage.setItem("backgroundImage", imageUrl);
  };
  useEffect(() => {
    const storedBackgroundImage = localStorage.getItem("backgroundImage");
    if (storedBackgroundImage) {
      setSelectedBackgroundImage(storedBackgroundImage);
    }
  }, []);

  // useEffect(() => {
  //   if (userName) {
  //     navigate(`/${userName}`);
  //   }
  // }, [userName, navigate]);

  useEffect(() => {
    setRerender(rerender + 1);
  }, [userName, userBio]);

  useEffect(() => {
    document.body.classList.add("default-background");

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove("default-background");
    };
  }, []);

  useEffect(() => {
    // Get the last timestamp when the popup was shown
    const lastPopupTimestamp = localStorage.getItem("lastPopupTimestamp");

    // Check if it's been at least 10 minutes since the last popup
    if (
      !lastPopupTimestamp ||
      Date.now() - lastPopupTimestamp > 10 * 60 * 1000
    ) {
      // Show the SweetAlert
      Swal.fire({
        title: "¡Bienvenido!",
        text: "Este es un mensaje personalizado.",
        icon: "info",
        confirmButtonText: "Aceptar",
      });

      // Update the last timestamp to the current time
      localStorage.setItem("lastPopupTimestamp", Date.now().toString());
    }
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url(${selectedBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        backgroundAttachment: "fixed",
        overflowX: "hidden",
      }}
    >
      <div className={darkMode ? "dark-mode h-100" : "light-mode"}>
        {!loggedIn ? (
          <NotLoggedIn
            handleLogin={handleLogin}
            setToken={setToken}
            loggedOut={loggedOut}
            userId2={userId2}
            userId={userId}
          />
        ) : (
          <div className={darkMode ? "dark-mode" : "light-mode"}>
            <div className="mode me-2">
              <span
                className="sunmoon"
                style={{ color: darkMode ? "grey" : "yellow" }}
              >
                ☀︎
              </span>
              <div className="switch-checkbox">
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={() => setDarkMode(!darkMode)}
                    checked={darkMode}
                  />
                  <span className="slider round"> </span>
                </label>
              </div>
              <span
                className="sunmoon"
                style={{ color: darkMode ? "#c96dfd" : "blue" }}
              >
                ☽
              </span>
            </div>
            <Container
              fluid
              className="d-flex justify-content-between align-items-center"
            >
              <div className="menu mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fillRule="currentColor"
                  className="bi bi-list rounded"
                  viewBox="0 0 16 16"
                  onClick={handleShow}
                  id="hamburger"
                  style={{
                    backgroundColor: darkMode
                      ? "#212529"
                      : "rgba(255,210,255,0.18)",
                    color: darkMode ? "white" : "black",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    fill={darkMode ? "white" : "black"}
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
                <br />
                {/* {loggedIn && (
                 
                )} */}
              </div>
              <Offcanvas
                show={show}
                onHide={handleClose}
                className={
                  darkMode ? "dark-mode rounded-end" : "light-mode rounded-end"
                }
                style={{
                  backdropFilter: "blur(5px)",
                  backgroundColor: darkMode
                    ? "rgba(255,210,255,0.2)"
                    : "rgba(0,0,0,0.5)",
                  color: darkMode ? "white" : "black",
                  position: "absolute",
                }}
              >
                <Offcanvas.Header
                  closeButton
                  className="rounded-bottom"
                  style={{
                    // backdropFilter: "blur(2px)",
                    // backgroundColor: darkMode
                    //   ? "rgba(0,0,0,0.5)"
                    //   : "rgba(255,210,255,0.18)",
                    color: darkMode ? "black" : "white",
                  }}
                >
                  <Offcanvas.Title>
                    <img
                      style={{
                        maxWidth: "300px",
                        marginLeft: "30px",
                        marginRight: "-30px",
                      }}
                      src="./Offcanvas.png"
                      alt="Page Name"
                    />
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Stack className="h-100" gap={3}>
                    {loggedIn ? (
                      <>
                        <div
                          className="d-flex justify-content-center"
                          style={{
                            color: darkMode ? "white" : "white",
                            fontSize: "1.4rem",
                          }}
                        >
                          <p className="fw-bolder fst-italic text-center">
                            {" "}
                            Welcome {userName} <br /> You can edit your page
                            here
                          </p>
                        </div>

                        <UserSettings
                          userId={userId}
                          token={token}
                          handleUserImageChange={handleUserImageChange}
                          handleBackgroundChange={handleBackgroundChange}
                          setImageUrl={handleUserImageChange}
                          handleRerender={handleRerender}
                          setUserName={setUserName}
                          setUserBio={setUserBio}
                          userName={userName}
                          userBio={userBio}
                          darkMode={darkMode}
                        />
                      </>
                    ) : (
                      <>
                        <LoginButton
                          handleLogin={handleLogin}
                          setToken={setToken}
                        />
                        <RegisterModal />
                      </>
                    )}
                    <Button
                      variant={darkMode ? "secondary" : "dark"}
                      onClick={handleLogout}
                      className="mt-auto mb-5"
                      style={{
                        border: darkMode ? "1px solid white" : "1px solid grey",
                      }}
                    >
                      Logout
                    </Button>
                  </Stack>
                </Offcanvas.Body>
              </Offcanvas>
            </Container>
            <Header
              userId={userId}
              userName={userName}
              userBio={userBio}
              setUserImage={handleUserImageChange}
              rerender={rerender}
              handleRerender={handleRerender}
              setUserName={setUserName}
              setUserBio={setUserBio}
              loggedIn={loggedIn}
            />

            <ListArea
              userId={userId}
              token={token}
              rerender={rerender}
              handleRerender={handleRerender}
              selectedIcon={selectedIcon}
              handleIconChange={handleIconChange}
              icons={icons}
              colors={colors}
              setColor={setColor}
              newColor={newColor}
            />
            <Footer loggedIn={loggedIn} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
