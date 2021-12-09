import React from "react";
import { useDispatch } from "react-redux";
import {logout} from "../../src/redux/actions/userActions"
const NotfoundPage = () => {
  const dispatch = useDispatch();
  dispatch(logout());
  return (
    <div>
      <h1 style={{ color: "red" }}>Not found page</h1>
    </div>
  );
};

export default NotfoundPage;
