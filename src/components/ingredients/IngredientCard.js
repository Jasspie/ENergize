import React, { useEffect } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Cart2, ViewList } from "react-bootstrap-icons";
import Pie from "../Pie";
import useWindowSize from "../../hooks/useWindowSize";
import { useRecipe } from "../../contexts/RecipeContext";

export default function IngredientCard({ ingredient, setDetails, details }) {
  const { ingredientsList, setIngredientsList } = useRecipe();
  const width = useWindowSize();
  const name = ingredient["name"];
  const category = ingredient["categories"];
  var score = Math.round(
    0.6 * ingredient["environment"]["environment_avg"] +
      0.6 * ingredient["nutrition"]["nutrition_avg"]
  );

  if (Number.isNaN(score)) score = 0;
  if (score > 100) score = 100;

  function fontSize(string) {
    var temp = string.length;
    var size = -4.5 * temp + 73.33;
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

  return (
    <Card className="shadow bg-white rounded">
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
                fontSize: width === "lg" ? "25px" : "9vw",
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
              onClick={() => {
                setDetails(name);
              }}
            >
              <ViewList /> View Details
            </Button>
            {ingredientsList.includes(ingredient) ? (
              <Button
                variant="outline-danger"
                style={{
                  fontSize: width === "lg" ? "25px" : "7.5vw",
                  marginBottom: width === "lg" ? "25px" : "30px",
                  padding: width === "lg" ? "10px" : "40px",
                }}
                onClick={() => {
                  setIngredientsList(
                    ingredientsList.filter((item) => item !== ingredient)
                  );
                }}
              >
                <Cart2 /> Remove
              </Button>
            ) : (
              <Button
                variant="outline-success"
                style={{
                  fontSize: width === "lg" ? "25px" : "7.5vw",
                  marginBottom: width === "lg" ? "25px" : "30px",
                  padding: width === "lg" ? "10px" : "40px",
                }}
                onClick={() => {
                  setIngredientsList((list) => [...list, ingredient]);
                }}
              >
                <Cart2 /> Add
              </Button>
            )}
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
