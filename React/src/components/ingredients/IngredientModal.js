import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import useWindowSize from "../../hooks/useWindowSize";

// Modal which includes relevant links for each ignredient
export default function IngredientModal({ setDetails, details }) {
  const width = useWindowSize();

  // Allows user to hide the details modal if they click the background
  function click(event) {
    if (event.target.classList.contains("background")) {
      setDetails(null);
    }
  }

  // Function which gets the colours for each ingredient score
  function getColour(number) {
    if (number > 90) return "#11b31e";
    else if (number > 84) return "#57a000";
    else if (number > 78) return "#748d00";
    else if (number > 72) return "#877800";
    else if (number > 66) return "#936200";
    else if (number > 62) return "#9b4a00";
    else if (number > 56) return "#9c2f00";
    else return "#990707";
  }

  function getScore(number) {
    var score = Math.round(1.2 * number);
    if (score > 100) return 100;
    else return score;
  }

  // Displays the relevant articles and their links for each of the ingredients
  function getArticles(data, type) {
    var articles = [];

    for (var i = 0; i < data[type][`${type + "_titles"}`].length; i++) {
      const url = "https://" + data[type][`${type + "_urls"}`][i];
      if (data[type][`${type + "_titles"}`][i] !== "") {
        articles.push(
          <Col lg={4} key={url}>
            <Card style={{ maxHeight: "25vh", border: "none" }}>
              <Card.Title style={{ fontSize: width === "lg" ? "18px" : "3vw" }}>
                <a target="_blank" rel="noopener noreferrer" href={url}>
                  {data[type][`${type + "_titles"}`][i]}
                </a>
              </Card.Title>
              {width === "lg" ? (
                <Card.Text
                  className="overflow-auto"
                  style={{
                    fontSize: width === "lg" ? "14px" : "2.5vw",
                    maxHeight: "20vh",
                  }}
                >
                  {data[type][`${type + "_summaries"}`][i]}
                </Card.Text>
              ) : null}
            </Card>
          </Col>
        );
      }
    }
    return articles;
  }

  return (
    <div
      className="background"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.6)",
        zIndex: 100,
      }}
      onClick={(event) => {
        click(event);
      }}
    >
      <Card
        style={{
          display: "block",
          maxWidth: "80%",
          maxHeight: "80%",
          margin: "90px auto",
          boxShadow: "5px 10px 20px rgba(0, 0, 0, 0.6)",
          padding: "40px",
        }}
      >
        <Card.Title
          style={{
            fontWeight: "bold",
            fontSize: width === "lg" ? "25px" : "4vw",
          }}
        >
          Environmental Impact Score:{" "}
          <span
            style={{
              color: getColour(
                getScore(details["environment"]["environment_avg"])
              ),
            }}
          >
            {getScore(details["environment"]["environment_avg"])}
          </span>
        </Card.Title>
        <Row>{getArticles(details, "environment")}</Row>
        <Card.Title
          style={{
            fontWeight: "bold",
            fontSize: width === "lg" ? "25px" : "4vw",
            paddingTop: "30px",
          }}
        >
          Nutritional Value Score:{" "}
          <span
            style={{
              color: getColour(getScore(details["nutrition"]["nutrition_avg"])),
            }}
          >
            {getScore(details["nutrition"]["nutrition_avg"])}
          </span>
        </Card.Title>
        <Row>{getArticles(details, "nutrition")}</Row>
      </Card>
    </div>
  );
}
