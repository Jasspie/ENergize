import React from "react";
import { Card } from "react-bootstrap";
import Pie from "../Pie";
import useWindowSize from "../../hooks/useWindowSize";
import Temp from "../Temp.jpg";

export default function RecipeCard() {
  const width = useWindowSize();

  const score = Math.floor(Math.random() * 100);

  return (
    <Card>
      <Card.Img
        variant="top"
        src={Temp}
        style={{
          width: "auto",
          height: width === "lg" ? "250px" : "375px",
          objectFit: "cover",
        }}
      />
      <Card.Body>
        <Card.Title
          className="text-center"
          style={{ fontSize: width === "lg" ? "30px" : "7vw" }}
        >
          Stir Fry
        </Card.Title>
        <Pie score={score} />
      </Card.Body>
    </Card>
  );
}
