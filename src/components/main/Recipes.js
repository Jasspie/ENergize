import React, { useEffect, useState } from "react";
import Navigation from "../Navigation";
import { Container, Row, Col } from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

export default function Recipes() {
  const { currentUser } = useAuth();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    database.recipes
      .where("userId", "==", currentUser.uid)
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        setRecipes(snapshot.docs.map(database.formatDoc));
        // console.log(snapshot.docs.map(database.formatDoc));
      });
  }, [currentUser]);

  // useEffect(() => {
  //   console.log(recipes);
  // }, [recipes]);

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
