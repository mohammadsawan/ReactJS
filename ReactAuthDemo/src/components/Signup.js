import React, { useRef, useState, useContext, useEffect } from "react";
import { Card, Button, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { signUpWithEmail } from "../firebase";
import { UserContext } from "../hooks/userContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [passErr, setPassErr] = useState("");
  const [passMatchErr, setPassMatchErr] = useState("");
  const { user, setUser } = useContext(UserContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/");
  }, [user]);

  const validateEmail = () => {
    return String(emailRef.current.value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePass = () => {
    if (passwordRef.current.value && passwordRef.current.value.length < 6) {
      setPassErr("Password must be 6 characters at least.");
    } else if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setPassMatchErr("Password not match !");
    } else {
      setPassMatchErr(false);
      setPassErr(false);
    }
  };

  const signUpIsValid = () => {
    validatePass();
    return !(!Array.isArray(validateEmail()) && passErr && passMatchErr);
  };

  const signUp = (e) => {
    e.preventDefault();
    if (signUpIsValid()) {
      signUpWithEmail(emailRef.current.value, passwordRef.current.value)
        .then((res) => {
          console.log(user);
          const userInfo = {
            email: res.user.email,
          };
          setUser(userInfo); // TODO
          localStorage.setItem(
            "login-system",
            JSON.stringify({ uid: res.user.uid, ...userInfo })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="">
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            <Form onSubmit={signUp}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required ref={emailRef} />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required ref={passwordRef} />
              </Form.Group>
              <Form.Group id="PasswordConfirm">
                <Form.Label>Passowrd Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  required
                  ref={passwordConfirmRef}
                />
              </Form.Group>
              <Button
                className="w-100 mt-2"
                type="submit"
                // disabled={passErr || passMatchErr ? "" : "disabled"}
              >
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          {passErr && <p>{passErr}</p>}
          {passMatchErr && <p>{passMatchErr}</p>}
          Already have account ? <Link to="/login">Log In</Link>
        </div>
      </div>
    </Container>
  );
}

export default SignUp;
