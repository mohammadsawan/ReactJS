import React, { useRef } from "react";
import { Card, Button, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function LogIn() {
  const passwordRef = useRef();
  const emailRef = useRef();

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="">
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            <Form>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required ref={emailRef} />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required ref={passwordRef} />
              </Form.Group>
              <Button className="w-100 mt-2" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          New user ? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </Container>
  );
}

export default LogIn;
