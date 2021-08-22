/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Redirect, Route } from "react-router-dom";

// eslint-disable-next-line
function ProtectedRoute({ component: Component, ...restOfProps }) {
  
  const isAuthUser = JSON.parse(localStorage.getItem('user'));

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthUser ? <Component {...props} /> : <Redirect to="/login"/>
      }
    />
  );
}

export default ProtectedRoute;