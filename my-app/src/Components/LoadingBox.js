import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function LoadingBox() {
  return (
    <Spinner animation="border" role="status">
        <div className="visually-hidden">Loading...</div>
    </Spinner>
  )
}

export default LoadingBox;
