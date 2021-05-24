import React from "react";
import Navigation from "../Navigation";
import { Container, Row, Col } from "react-bootstrap";
import RecipeCard from "./RecipeCard";

export default function Recipes() {
  return (
    <div style={{ backgroundColor: "#f2fcff" }}>
      <Navigation />
      <Container>
        <Row
          className="justify-content-md-center"
          style={{
            margin: "30px",
            wordWrap: "break-word",
          }}
        >
          <Col lg={3} style={{ paddingBottom: "25px" }}>
            <RecipeCard />
          </Col>
          <Col lg={3} style={{ paddingBottom: "25px" }}>
            <RecipeCard />
          </Col>
          <Col lg={3} style={{ paddingBottom: "25px" }}>
            <RecipeCard />
          </Col>
          <Col lg={3} style={{ paddingBottom: "25px" }}>
            <RecipeCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
