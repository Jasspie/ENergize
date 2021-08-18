import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Cart2, ViewList } from "react-bootstrap-icons";
import Pie from "../Pie";
import useWindowSize from "../../hooks/useWindowSize";
import { useRecipe } from "../../contexts/RecipeContext";

export default function IngredientCard({ ingredient, setDetails, details }) {
  const { ingredientsList, setIngredientsList, setScores, scores } =
    useRecipe();
  const [isShown, setIsShown] = useState(false);
  const width = useWindowSize();
  const name = ingredient["name"];
  const category = ingredient["categories"];
  var score = Math.round(
    0.6 * ingredient["environment"]["environment_avg"] +
      0.6 * ingredient["nutrition"]["nutrition_avg"]
  );

  // Sets score to zero if it is invalid, and 100 if it exceeds that value
  if (Number.isNaN(score)) score = 0;
  if (score > 100) score = 100;

  // Calculates fontsize for headers
  function fontSize(string) {
    var temp = string.length;
    var size = -4.5 * temp + 70;
    if (temp < 8) return 35;
    if (size > 25) return size;
    else return 25;
  }

  function renameCategory(category) {
    if (category === "Vegetarian") return "Vegetables";
    if (category === "Beans" || category === "Nuts") return "Meat Alternative";
    if (category === "Bread") return "Grains";
    return category;
  }

  useEffect(() => {
    if (details) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [details]);

  // Updates the ingredients list based on user input
  function updateList() {
    setScores({ ...scores, [name]: score });
    if (listStatus())
      setIngredientsList(ingredientsList.filter((item) => item !== name));
    else setIngredientsList((list) => [...list, name]);
  }

  // Handles whether the add or remove button should be displayed
  function listStatus() {
    if (ingredientsList.includes(name)) return true;
    else return false;
  }

  return (
    <Card
      className="shadow bg-white rounded"
      style={{
        transform: isShown ? "scale(1.05)" : "",
        transition: ".3s transform cubic-bezier(.155,1.105,.295,1.12)",
      }}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <Row className="align-items-center">
        <Col lg={6} style={{ padding: width === "lg" ? "25px" : "35px" }}>
          <Pie score={score} />
        </Col>
        <Col lg={6} className={width === "lg" ? "" : "text-center"}>
          <Card.Body>
            <Card.Title
              style={{
                fontWeight: "bold",
                fontSize: width === "lg" ? fontSize(`${name}`) : "11vw",
              }}
            >
              {name}
            </Card.Title>
            <Card.Subtitle
              style={{
                fontSize: width === "lg" ? "20px" : "9vw",
                marginBottom: width === "lg" ? "25px" : "60px",
              }}
            >
              {renameCategory(category)}
            </Card.Subtitle>
            <Button
              variant="outline-primary"
              style={{
                fontSize: width === "lg" ? "25px" : "7.5vw",
                marginBottom: width === "lg" ? "25px" : "30px",
                padding: width === "lg" ? "10px" : "40px",
              }}
              onClick={() => setDetails(name)}
            >
              <ViewList /> View Details
            </Button>
            <Button
              variant={listStatus() ? "outline-danger" : "outline-success"}
              style={{
                fontSize: width === "lg" ? "25px" : "7.5vw",
                marginBottom: width === "lg" ? "25px" : "30px",
                padding: width === "lg" ? "10px" : "40px",
              }}
              onClick={updateList}
            >
              <Cart2 /> {listStatus() ? "Remove" : " Add"}
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
