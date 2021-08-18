import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";

// Component that displays each of the user's recipes as a card on the home page
export default function RecipeCard({ recipe }) {
  const [isShown, setIsShown] = useState(false);
  const width = useWindowSize();
  let history = useHistory();

  return (
    <Card
      className="shadow bg-white rounded "
      onClick={() => {
        history.push(`/recipes/${recipe.id}`);
      }}
      style={{
        transform: isShown ? "scale(1.05)" : "",
        transition: ".3s transform cubic-bezier(.155,1.105,.295,1.12)",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <Card.Body>
        <Card.Title
          className="text-center"
          style={{ fontSize: width === "lg" ? "30px" : "7vw" }}
        >
          {recipe.title}
        </Card.Title>
      </Card.Body>
      <Card.Img
        variant="top"
        src={recipe.photo}
        style={{
          width: "auto",
          height: width === "lg" ? "325px" : "375px",
          objectFit: "cover",
        }}
      />
    </Card>
  );
}
