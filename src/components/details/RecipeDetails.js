import React, { useState } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import { Upload } from "react-bootstrap-icons";
import { database } from "../../firebase";
import useWindowSize from "../../hooks/useWindowSize";

export default function RecipeDetails() {
  const width = useWindowSize();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg", "image/jpg"];

  function imgUpload(event) {
    let selected = event.target.files[0];
    if (selected && types.includes(selected.type)) {
      setError(null);
      setFile(selected);
    } else if (selected === null) {
      setFile(null);
      setError("Select a valid image file");
    }
  }

  return (
    <Container>
      <Row>
        <Col lg={12} style={{ paddingBottom: "10px", paddingTop: "20px" }}>
          <h6 style={{ fontSize: width === "lg" ? "60px" : "80px" }}>
            📋 Recipe Overview
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
            />
          </Col>
          <Col lg={12} style={{ paddingBottom: "20px" }}>
            <h3 style={{ color: "#7C7C7D" }}>Ingredient List</h3>
            <Form.Control
              as="textarea"
              rows={10}
              className="shadow-sm bg-white rounded"
              size="lg"
              type="text"
              placeholder=""
            />
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
                paddingLeft: "15px",
                paddingRight: "15px",
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
          <Row style={{ marginTop: "15px" }}>
            <Form.Control
              className="shadow-sm bg-white rounded"
              size="lg"
              type="text"
              placeholder="Search for a photo..."
            />
          </Row>
          {/* <Row>{file && <img src={file} alt="File Upload" />}</Row> */}
        </Col>
      </Row>
    </Container>
  );
}
