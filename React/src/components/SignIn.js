import React from "react";
import { auth } from "../firebase";
import { StyledFirebaseAuth } from "react-firebaseui";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import Logo from "./Logo.png";

export default function SignIn() {
  let history = useHistory();
  const uiConfig = {
    signInFlow: "redirect",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: "/ENergize",
  };
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <img src={Logo} alt="Energize Logo" style={{ paddingBottom: "15px" }} />
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
    </Container>
  );
}
