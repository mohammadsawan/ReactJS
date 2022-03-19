import React, { useRef, useState, useEffect, useContext } from "react";
import { Card, Button, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logInWithEmail } from "../firebase";
import { UserContext } from "../hooks/userContext";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [err, setErr] = useState("");
  const { user, setUser } = useContext(UserContext);

  const passwordRef = useRef();
  const emailRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/");
  }, [user]);

  const logIn = (e) => {
    e.preventDefault();
    logInWithEmail(emailRef.current.value, passwordRef.current.value)
      .then((res) => {
        console.log(res.user.email); // TODO
        console.log("before", user); // TODO
        const userInfo = {
          email: res.user.email,
        };
        setUser(userInfo); // TODO
        console.log("after", user); // TODO

        localStorage.setItem(
          "login-system",
          JSON.stringify({ uid: res.user.uid, ...userInfo })
        );
      })
      .catch((err) => {
        setErr("Email or Password not valid !");
        console.log(err); // To Delete
      });
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="">
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            <Form onSubmit={logIn}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required ref={emailRef} />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required ref={passwordRef} />
              </Form.Group>
              {err && (
                <p className="text-center mt-2 alert alert-danger">{err}</p>
              )}
              <Button className="w-100 mt-1" type="submit">
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
