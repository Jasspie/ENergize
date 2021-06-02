import React, { useEffect, useState } from "react";
import Navigation from "../Navigation";
import { Container, Row, Col } from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import useWindowSize from "../../hooks/useWindowSize";

export default function Recipes() {
  const { currentUser } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const width = useWindowSize();

  useEffect(() => {
    let isMounted = true;
    function fetchRecipes() {
      database.recipes
        .where("userId", "==", currentUser.uid)
        .orderBy("createdAt")
        .onSnapshot((snapshot) => {
          if (isMounted) {
            setRecipes(snapshot.docs.map(database.formatDoc));
            // console.log(snapshot.docs.map(database.formatDoc));
          }
        });
    }
    fetchRecipes();
    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  // useEffect(() => {
  //   console.log(recipes);
  // }, [recipes]);

  return (
    <div style={{ backgroundColor: "#f2fcff" }}>
      <Navigation />
      <Container>
        {recipes.length === 0 && (
          <div style={{ textAlign: "center" }}>
            <h6
              style={{
                fontSize: width === "lg" ? "40px" : "60px",
                marginTop: "30px",
              }}
            >
              Your list of recipes is empty,
            </h6>
            <h3 style={{ color: "#7C7C7D" }}>
              Click on "Create a Recipe!" to get started
            </h3>
          </div>
        )}
        <Row
          className="justify-content-md-center"
          style={{
            margin: "30px",
            wordWrap: "break-word",
          }}
        >
          {recipes &&
            recipes.map((recipe) => {
              return (
                <Col lg={6} key={recipe.id} style={{ paddingBottom: "25px" }}>
                  <RecipeCard recipe={recipe} />
                </Col>
              );
            })}
        </Row>
      </Container>
    </div>
  );
}
