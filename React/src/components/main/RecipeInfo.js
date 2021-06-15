import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { database } from "../../firebase";
import Navigation from "../Navigation";
import Pie from "../Pie";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import useWindowSize from "../../hooks/useWindowSize";

export default function RecipeInfo() {
  const width = useWindowSize();
  const recipe = useParams();
  const [recipeData, setRecipeData] = useState({});
  let history = useHistory();

  useEffect(() => {
    async function fetchRecipes() {
      await database.recipes
        .doc(recipe.id)
        .get()
        .then((existingRecipes) => {
          // console.log(database.formatDoc(existingRecipes));
          setRecipeData(database.formatDoc(existingRecipes));
        });
    }
    fetchRecipes();
    return () => {
      setRecipeData({});
    };
  }, [recipe]);

  function getIngredients() {
    const list = recipeData.ingredientsList;
    if (list) {
      const ingredients = list.map((ingredient) => {
        return (
          <span
            key={ingredient}
            style={{
              fontSize: width === "lg" ? "25px" : "40px",
              color: "#7C7C7D",
              paddingRight: "15px",
            }}
          >
            {`•${ingredient}`}{" "}
          </span>
        );
      });
      return ingredients;
    }
  }

  async function deleteRecipe() {
    await database.recipes.doc(recipe.id).delete();
    history.push("/");
  }

  return (
    <div style={{ backgroundColor: "#f2fcff" }}>
      <Navigation />
      {recipeData && (
        <Container style={{ padding: "30px" }}>
          <Card className="shadow bg-white rounded ">
            <Row style={{ marginTop: "30px" }}>
              <Col lg={12}>
                <h6
                  style={{
                    fontSize: width === "lg" ? "60px" : "80px",
                    textAlign: "center",
                  }}
                >
                  {recipeData.title}
                </h6>
              </Col>
            </Row>
            <Row>
              <Col
                lg={6}
                style={{
                  textAlign: "center",
                  paddingLeft: "50px",
                  paddingRight: "50px",
                  paddingTop: "20px",
                  paddingBottom: "30px",
                }}
              >
                <h3
                  style={{
                    fontSize: width === "lg" ? "40px" : "50px",
                    marginBottom: "40px",
                  }}
                >
                  ENergize Recipe Score
                </h3>
                <Pie score={recipeData.average} />
              </Col>
              <Col
                lg={6}
                style={{
                  paddingLeft: "50px",
                  paddingRight: "50px",
                  paddingTop: "20px",
                  paddingBottom: "30px",
                }}
              >
                <h3
                  style={{
                    fontSize: width === "lg" ? "40px" : "50px",
                    marginBottom: "10px",
                  }}
                >
                  Ingredients
                </h3>
                {getIngredients()}
                <h3
                  style={{
                    fontSize: width === "lg" ? "40px" : "50px",
                    marginTop: "40px",
                    marginBottom: "10px",
                  }}
                >
                  Details
                </h3>
                <span
                  style={{
                    fontSize: width === "lg" ? "25px" : "40px",
                    color: "#7C7C7D",
                  }}
                >
                  {recipeData.details}
                </span>
                <br />
                <div
                  style={{
                    paddingTop: "40px",
                    paddingBottom: "20px",
                  }}
                >
                  <Button
                    variant="outline-danger"
                    style={{ fontSize: "25px" }}
                    onClick={deleteRecipe}
                  >
                    <Trash /> Delete Recipe
                  </Button>
                </div>
                {/* <div
                  style={{
                    paddingBottom: "40px",
                  }}
                >
                  <Button
                    variant="outline-danger"
                    style={{ fontSize: "25px" }}
                    // onClick={() => history.push("/overview")}
                  >
                    Edit Recipe
                  </Button>
                </div> */}
              </Col>
            </Row>
          </Card>
        </Container>
      )}
    </div>
  );
}
