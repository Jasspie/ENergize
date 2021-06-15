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
  const [helper, setHelper] = useState(false);
  const width = useWindowSize();

  useEffect(() => {
    let isMounted = true;
    function fetchRecipes() {
      database.recipes
        .where("userId", "==", currentUser.uid)
        .orderBy("createdAt")
        .onSnapshot((snapshot) => {
          if (isMounted) {
            const data = snapshot.docs.map(database.formatDoc);
            data.length === 0 ? setHelper(true) : setRecipes(data);
            console.log(data);
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
        {helper && (
          <div style={{ textAlign: "center" }}>
            <h6
              style={{
                fontSize: width === "lg" ? "40px" : "60px",
                marginTop: "30px",
              }}
            >
              Welcome to ENergize!
            </h6>
            <h3 style={{ color: "#7C7C7D" }}>
              ENergize allows you to create recipes and view <br />
              the health benefits and environmental impact <br />
              for each of your ingredients.
              <br />
            </h3>
            <h6
              style={{
                fontSize: width === "lg" ? "40px" : "60px",
                marginTop: "10px",
              }}
            >
              Check Out "Create a Recipe!"
            </h6>
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
