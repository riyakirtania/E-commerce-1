import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom";
import logger from "use-reducer-logger";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

function ProductScreen() {
    const params=useParams();
    const {slug}=params;
    
    const [{ loading, error, product }, dispatch] = useReducer(logger(reducer), {
      loading: true,
      error: "",
      product: [],
    });
    useEffect(() => {
      const fetchData = async () => {
        dispatch({ type: "FETCH_REQUEST" });
        try {
          const result = await axios.get(`/api/products/slug/${slug}`);
          // setProducts(result.data);
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        } catch (err) {
          dispatch({ type: "FETCH_FAILURE", payload: err.message });
        }
      };
      fetchData();
    }, [slug]);
  return (
    <div>
      {loading?(<div>Loading...</div>):
      error?(<div>{error}</div>):
      (
        <div>{product.name}</div>
      )}
    </div>
  )
}

export default ProductScreen;
