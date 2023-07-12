import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logger from "use-reducer-logger";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from "../Components/Product";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
function HomeScreen() {
  // const [products,setProducts]=useState([]);
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: "",
    products: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        // setProducts(result.data);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAILURE", payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row>
          {products.map((product) => {
            return (
              <Col sm={6} md={4} lg={3} className="mb-3" key={product.slug} >
                <Product product={product}/>
              </Col>
            );
          })}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
