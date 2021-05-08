import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import { Switch, Route } from "react-router-dom";
import Play from "./components/Play/Play";
import Login from "./components/Login/Login";
import Mine from "./components/Mine/Mine";
import Test from "./components/Test";
import ChangeNickName from "./components/ChangeNickName";
import UserRoute from "./components/UserRoute";
import Recharge from "./components/Recharge/Reacharge";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer />

      <Route exact path='/' component={Register} />

      <Route exact path='/login' component={Login} />
      <Route exact path='/test' component={Test} />
      <UserRoute exact path='/:id/changeNickName' component={ChangeNickName} />
      <UserRoute exact path='/mine' component={Mine} />

      <UserRoute exact path='/play' component={Play} />
      <UserRoute exact path='/recharge' component={Recharge} />
    </>
  );
};

export default App;
