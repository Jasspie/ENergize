import React from "react";
import { Card, Row, Col } from "react-bootstrap";

// Renders the image search from the Unsplash API as two columns of cards
export default function SearchCard({ search, setSearchTitle, setFile }) {
  function getCards(a, b) {
    const cards = search.slice(a, b).map((card) => {
      return (
        <Card key={card.id} style={{ margin: "10px", borderWidth: "0px" }}>
          <Card.Img
            variant="top"
            src={card.urls.regular}
            style={{
              width: "auto",
              objectFit: "cover",
            }}
            onClick={() => {
              const title = "Image: " + card.alt_description;
              setSearchTitle(title);
              setFile(card.urls.regular);
            }}
          />
        </Card>
      );
    });
    return cards;
  }

  return (
    <Row style={{ padding: "0px" }}>
      <Col lg={6} style={{ padding: "0px" }}>
        {getCards(0, 5)}
      </Col>
      <Col lg={6} style={{ padding: "0px" }}>
        {getCards(6, 11)}
      </Col>
    </Row>
  );
}
