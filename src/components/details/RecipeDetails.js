import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Alert, Button } from "react-bootstrap";
import { Upload, Trash } from "react-bootstrap-icons";
import Navigation from "../Navigation";
import useWindowSize from "../../hooks/useWindowSize";
import { useHistory } from "react-router-dom";
import { useRecipe } from "../../contexts/RecipeContext";
import { useAuth } from "../../contexts/AuthContext";
import { storage } from "../../firebase";
import Search from "./Search";
import SearchCard from "./SearchCard";

export default function RecipeDetails() {
  const width = useWindowSize();
  const [validity, setValidity] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [file, setFile] = useState(null);
  const [search, setSearch] = useState(null);
  const [searchTitle, setSearchTitle] = useState("No Photo Selected.");
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg", "image/jpg"];

  let history = useHistory();
  const {
    setDetails,
    details,
    setTitle,
    title,
    setIngredientsList,
    ingredientsList,
    reset,
    scores,
    submitRecipe,
  } = useRecipe();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (ingredientsList.length === 0) {
      reset();
      history.push("/ingredients");
    }
  }, [ingredientsList, history, reset]);

  useEffect(() => {
    if (title.length === 0 || details.length === 0 || file === null)
      setValidity(false);
    else setValidity(true);
  }, [title, details, file]);

  async function imgUpload(event) {
    let selected = event.target.files[0];
    console.log(selected);
    if (selected && types.includes(selected.type)) {
      setError(null);
      const path = `recipes/${currentUser.uid}/${selected.name}`;
      const ref = storage.ref(path);
      try {
        await ref.getDownloadURL().then((url) => {
          console.log(url);
          setFile(url);
          setSearchTitle(selected.name);
        });
      } catch (err) {
        const uploadTask = storage.ref(path).put(selected);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          () => {},
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              console.log(url);
              setFile(url);
              setSearchTitle(selected.name);
            });
          }
        );
      }
    } else if (selected === null) {
      setFile(null);
      setError("Select a valid image file");
    }
  }

  function handleSubmit() {
    let score = 0;
    ingredientsList.forEach((ingredient) => {
      score += scores[`${ingredient}`];
    });
    const average = Math.floor(score / ingredientsList.length);
    console.log(average);
    setSubmit(true);
    submitRecipe(average, file);
    if (validity) console.log("valid");
  }

  function list() {
    var buttons = [];
    ingredientsList.forEach((ingredient) => {
      buttons.push(
        <Button
          key={ingredient}
          variant="outline-danger"
          style={{
            padding: "5px",
            paddingLeft: "15px",
            paddingRight: "15px",
            fontSize: "22px",
            marginRight: "10px",
            marginBottom: "10px",
          }}
          onClick={() =>
            setIngredientsList(
              ingredientsList.filter((item) => item !== ingredient)
            )
          }
        >
          <Trash /> {ingredient}
        </Button>
      );
    });
    return buttons;
  }

  async function onSearchSubmit(event) {
    event.preventDefault();
    const response = await Search.get("search/photos", {
      baseURL: "https://api.unsplash.com",
      headers: {
        Authorization: "Client-ID " + process.env.REACT_APP_UNSPLASH_API_KEY,
      },
      params: { query: searchTerm },
    });
    const results = response.data.results;
    console.log(results);
    setError(null);
    setSearch(results);
  }

  return (
    <div style={{ backgroundColor: "#f2fcff" }}>
      <Navigation />
      <Container style={{ paddingBottom: "40px" }}>
        <Row>
          <Col lg={12} style={{ paddingBottom: "10px", paddingTop: "20px" }}>
            <h6 style={{ fontSize: width === "lg" ? "60px" : "80px" }}>
              <span role="img" aria-label="">
                📋 Recipe Overview
                <span style={{ float: "right" }}>
                  <Button
                    variant="outline-dark"
                    style={{ fontSize: "25px", marginRight: "15px" }}
                    onClick={() => history.push("/ingredients")}
                  >
                    ￩ Back
                  </Button>
                  <Button
                    variant="outline-dark"
                    style={{ fontSize: "25px" }}
                    onClick={handleSubmit}
                  >
                    Finish ￫
                  </Button>
                </span>
              </span>
            </h6>
          </Col>
        </Row>
        <Row>
          <Col lg={6} style={{ padding: "0px" }}>
            <Col lg={12} style={{ paddingBottom: "20px" }}>
              <h3 style={{ color: "#7C7C7D" }}>Title</h3>
              <Form.Control
                className="shadow-sm bg-white rounded"
                size="lg"
                type="text"
                placeholder="Give your recipe a name!"
                isInvalid={submit && title.length === 0}
                onChange={(event) => setTitle(event.target.value)}
                value={title}
              />
            </Col>
            <Col lg={12} style={{ paddingBottom: "20px" }}>
              <h3 style={{ color: "#7C7C7D" }}>Ingredient List</h3>
              {list()}
            </Col>
            <Col lg={12} style={{ paddingBottom: "20px" }}>
              <h3 style={{ color: "#7C7C7D" }}>Details</h3>
              <Form.Control
                as="textarea"
                rows={10}
                className="shadow-sm bg-white rounded"
                size="lg"
                type="text"
                placeholder="Recipe description, additional ingredients, instructions for preparation, etc."
                isInvalid={submit && details.length === 0}
                onChange={(event) => setDetails(event.target.value)}
                value={details}
              />
            </Col>
          </Col>
          <Col lg={6} style={{ paddingLeft: "30px" }}>
            <Row>
              <h3 style={{ color: "#7C7C7D" }}>Photo</h3>
            </Row>
            <Row>
              <label
                className="btn btn-outline-success"
                style={{
                  padding: "5px",
                  fontSize: "22px",
                }}
              >
                <input
                  type="file"
                  style={{
                    opacity: 1,
                    padding: "0px",
                    left: "-99999px",
                    position: "absolute",
                  }}
                  onChange={imgUpload}
                />
                <Upload style={{ height: "35px" }} /> Upload a Photo
              </label>
              {error && (
                <Alert style={{ marginLeft: "15px" }} variant="danger">
                  Please Upload an Image File
                </Alert>
              )}
            </Row>
            <Row>
              {searchTitle && (
                <label
                  style={{
                    padding: "5px",
                    fontSize: "22px",
                    color: submit && !file ? "#DC3545" : "#7C7C7D",
                  }}
                >
                  {searchTitle}
                </label>
              )}
            </Row>
            <Row>
              <form onSubmit={onSearchSubmit} style={{ width: "100%" }}>
                <Form.Control
                  className="shadow-sm bg-white rounded"
                  size="lg"
                  type="text"
                  placeholder="Search for a photo..."
                  onChange={(event) => setSearchTerm(event.target.value)}
                  value={searchTerm}
                />
              </form>
            </Row>
            {search && (
              <SearchCard
                search={search}
                setSearchTitle={setSearchTitle}
                setFile={setFile}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
