import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Store } from "../Store";
import ErrorMessage from "../Components/ErrorMessage";
import { Link } from "react-router-dom";

function CardScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <ErrorMessage>
              Cart is Empty. <Link to="/">Go Shipping</Link>
            </ErrorMessage>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <img
                        src={item.image}
                        alt={item.image}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{" "}
                    </Col>
                    <Col md={3}>
                      <Link to={`product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button variant="light" disabled={item.quantity === 1}>
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button variant="light" disabled={item.quantity === 1}>
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={1}>
                      <Button varient="light">
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                  items) : $
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className="d-grid">
                        <Button variant="primary" type="button" disabled={cartItems.length === 0}>Proceed to Checkout</Button>
                    </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CardScreen;
