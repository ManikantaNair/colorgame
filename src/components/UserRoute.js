import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = ({ ...rest }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return userInfo && userInfo.token ? (
    <Route {...rest} />
  ) : (
    <Redirect to='/login' />
  );
};
export default UserRoute;
