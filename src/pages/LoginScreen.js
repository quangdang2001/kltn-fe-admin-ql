import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/message/Message";
import Loader from "../components/loader/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div
      style={{
        marginLeft: "calc(40% - 300px)",
        border: "1px solid #cccccc",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        padding: "2rem 2rem",
        borderRadius: "16px",
        width: "50%",
      }}
    >
      <Container fluid>
        <h1 style={{fontWeight: "bold"}}>Sign In</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label> Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" style={{width: "100%", marginTop: "10px"} }>
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default LoginScreen;
