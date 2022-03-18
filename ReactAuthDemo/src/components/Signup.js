import React, { useRef, useState } from "react";
import { Card, Button, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { signInWithEmail } from "../firebase";

function SignUp() {
  const [passErr, setPassErr] = useState("");
  const [passMatchErr, setPassMatchErr] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

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
      setPassMatchErr(null);
      setPassErr(null);
    }
  };

  const signUpIsValid = () => {
    return (
      !emailErr && !passErr && emailInput.length > 0 && passInput.length >= 6
    );
  };

  const signUp = () => {
    if (signUpIsValid()) {
      signInWithEmail(emailInput, passInput)
        .then((user) => {
          const userInfo = {
            username: user.user.displayName || nameInput,
            email: user.user.email,
          };
          setDoc(doc(db, "users", user.user.uid), userInfo).then(() => {
            setUser(userInfo);
            localStorage.setItem(
              "twitter-clone",
              JSON.stringify({ uid: user.user.uid, ...userInfo })
            );
          });
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
            <Form>
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
              <Button className="w-100 mt-2" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have account ? <Link to="/login">Log In</Link>
        </div>
      </div>
    </Container>
  );
}

export default SignUp;
