import React, { useState } from "react";
import { Col, Row, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Widget from "../../components/Widget/Widget";

const Typography = () => {
  const [report, setReport] = useState({ title: "", description: "", date: "" });

  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Report submitted:", report);
  };

  return (
    <div>

     
      <Row>
        <Col lg={12}>
          <Widget title={"Crear Reporte"}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="title">Report Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter report title"
                  value={report.title}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Enter report description"
                  value={report.description}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="date">Date</Label>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  value={report.date}
                  onChange={handleChange}
                />
              </FormGroup>
              <Button color="primary" type="submit">
                Submit Report
              </Button>
            </Form>
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

export default Typography;
