import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";
import { getError } from "../Util";
import axios from "axios";
import { Store } from "../Store";

function Product({ product }) {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of Stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
      // payload: { ...product, quantity: 1 },
    });
    navigate("/cart");
  };
  return (
    // className="card-img-top"
    <Card className="product" style={{ border: "none", textAlign: "center" }}>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>
          <strong>${product.price}</strong>
        </Card.Text>
        <Button onClick={addToCartHandler}>Add to cart</Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
