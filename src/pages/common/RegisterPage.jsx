import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../../schema/registerForm";
import axiosInstance from "../../api/axiosInstance";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      try {
        axiosInstance.post("/api/register", values).then((response) => {
          if (response.data.success) {
            navigate(`/verify/${response.data.token}`);
            setErrorMessage("");
          } else {
            setErrorMessage(response.data.message);
          }
        });
      } catch (error) {
        console.log("Error in register: ", error);
      }
    },
  });

  const handleNavigateLoginPage = () => {
    navigate("/login");
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="my-3">
            <Card.Body>
              <Card.Title className="text-center mb-5">
                <h2>Register</h2>
              </Card.Title>
              {errorMessage && (
                <div className="error-message mb-2">{errorMessage}</div>
              )}
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Control
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="error-message">
                      {formik.errors.username}
                    </div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error-message">{formik.errors.email}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error-message">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mt-3">
                  <Button variant="outline-secondary" type="submit">
                    Register
                  </Button>
                </Form.Group>
                <Form.Group className="d-flex justify-content-center mt-4">
                  <Button variant="link" onClick={handleNavigateLoginPage}>
                    Already have an account? Login
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default RegisterPage;
