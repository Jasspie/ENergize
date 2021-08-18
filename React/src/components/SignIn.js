import React from "react";
import { auth } from "../firebase";
import { StyledFirebaseAuth } from "react-firebaseui";
import { Container } from "react-bootstrap";
import firebase from "firebase";
import Logo from "./Logo.png";
import useWindowSize from "../hooks/useWindowSize";

export default function SignIn() {
  const width = useWindowSize();
  const uiConfig = {
    signInFlow: "redirect",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: "/",
  };
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <img
          src={Logo}
          alt="Energize Logo"
          style={{
            paddingBottom: width === "lg" ? "15px" : "0px",
            transform: width === "lg" ? "scale(0.9)" : "scale(0.6)",
          }}
        />
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
    </Container>
  );
}
