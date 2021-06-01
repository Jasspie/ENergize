import React, { useState } from "react";
import { Button, Alert, Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useRecipe } from "../contexts/RecipeContext";
import { Link, useHistory } from "react-router-dom";

export default function Navigation() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const { ingredients, reset } = useRecipe();
  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <Navbar fixed="top" bg="light" style={{ position: "sticky" }}>
      <Navbar.Brand as={Link} to="/" onClick={reset}>
        ENergize
      </Navbar.Brand>
      <Nav>
        <Nav.Link
          as={Link}
          to={{ pathname: "/ingredients", state: ingredients }}
        >
          Create a Recipe!
        </Nav.Link>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>User: {currentUser.displayName}</Navbar.Text>
        <img
          src={currentUser.photoURL}
          style={{ marginLeft: "15px", height: "40px" }}
          alt="Profile"
        />
        <Button
          variant="outline-primary"
          style={{ marginLeft: "15px" }}
          onClick={handleLogout}
        >
          Log Out
        </Button>
        {error && (
          <Alert style={{ marginLeft: "15px" }} variant="danger">
            {error}
          </Alert>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
