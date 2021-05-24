import React, { useEffect, useState } from "react";
import Navigation from "../Navigation";
import IngredientCard from "./IngredientCard";
import { Container, Row, Col, Form } from "react-bootstrap";
import useWindowSize from "../../hooks/useWindowSize";
import ingredients from "../../data/all_data.json";
import IngredientModal from "./IngredientModal";
import RecipeDetails from "../details/RecipeDetails";

export default function CreateRecipe() {
  const width = useWindowSize();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Filter by Group...");
  const [details, setDetails] = useState(null);
  const [data, setData] = useState({});
  const [ingredientList, setIngredientList] = useState([]);

  function getSentiment(object, type) {
    var count = 0;
    var total = 0;
    var temp = {};
    temp[`${type + "_titles"}`] = [];
    temp[`${type + "_summaries"}`] = [];
    temp[`${type + "_urls"}`] = [];
    for (var i = 0; i < 3; i++) {
      var sentiment = object[type + "_sentiment"][i].trim();
      if (sentiment !== "" && sentiment !== "\n" && sentiment !== "ERROR") {
        temp[`${type + "_titles"}`].push(object[`${type + "_titles"}`][i]);
        temp[`${type + "_summaries"}`].push(
          object[`${type + "_summaries"}`][i]
        );
        temp[`${type + "_urls"}`].push(object[`${type + "_urls"}`][i]);
        total += parseInt(sentiment);
        count++;
      }
    }
    if (count === 0) temp[`${type + "_avg"}`] = 0;
    else temp[`${type + "_avg"}`] = Math.round(total / count);
    return temp;
  }

  useEffect(() => {
    const arr = ingredients["data"];
    const newData = {};
    arr.forEach((ingredient) => {
      const name = `${ingredient["name"][0]}`;
      newData[name] = {};
      newData[name]["nutrition"] = {};
      newData[name]["environment"] = {};
      newData[name]["name"] = name;
      newData[name]["categories"] = ingredient["categories"][0];
      newData[name]["nutrition"] = getSentiment(ingredient, "nutrition");
      newData[name]["environment"] = getSentiment(ingredient, "environment");
    });
    setData((e) => (e = newData));
  }, []);

  function getCards() {
    var cards = [];
    var keys = Object.keys(data);
    if (keys !== 0) {
      keys.forEach((ingredient) => {
        if (
          (filter === "Filter by Group..." ||
            filter.includes(data[ingredient]["categories"])) &&
          (search === "" ||
            ingredient.toLowerCase().includes(search.toLowerCase()))
        ) {
          cards.push(
            <Col key={ingredient} lg={6} style={{ paddingBottom: "25px" }}>
              <IngredientCard
                ingredient={data[ingredient]}
                setDetails={setDetails}
                details={details}
                ingredientList={ingredientList}
                setIngredientList={setIngredientList}
              />
            </Col>
          );
        }
      });
      return cards;
    } else return null;
  }

  return (
    <div style={{ backgroundColor: "#f2fcff" }}>
      {details && (
        <IngredientModal setDetails={setDetails} details={data[details]} />
      )}
      <Navigation />
      <RecipeDetails />
      <br />
      <Container>
        <Row>
          <Col lg={12} style={{ paddingBottom: "5px", paddingTop: "20px" }}>
            <h6 style={{ fontSize: width === "lg" ? "60px" : "80px" }}>
              🍽 Add Ingredients
            </h6>
            <h3 style={{ color: "#7C7C7D" }}>
              Ingredients are scored based on nutritional and sustainability
              factors.
            </h3>
          </Col>
        </Row>
        <Row>
          <Col lg={9} style={{ paddingBottom: "25px" }}>
            <Form.Control
              className="shadow-sm bg-white rounded"
              size="lg"
              type="text"
              placeholder="Search for an ingredient..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </Col>
          <Col lg={3} style={{ paddingBottom: "25px" }}>
            <Form.Control
              className="shadow-sm bg-white rounded"
              as="select"
              size="lg"
              custom
              onChange={(event) => {
                setFilter(event.target.value);
              }}
            >
              <option>Filter by Group...</option>
              <option>Fruits</option>
              <option>Vegetables</option>
              <option>Grains</option>
              <option>Dairy</option>
              <option>Meat</option>
              <option>Meat Alternatives</option>
              <option>Seafood</option>
            </Form.Control>
          </Col>
        </Row>
        <Row>{getCards()}</Row>
      </Container>
    </div>
  );
}
