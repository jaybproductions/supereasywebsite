import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import React, { useState } from "react";
import useAuth from "./hooks/useAuth";
import UserContext from "./contexts/UserContext";
//Page Imports
import Home from "./pages/Home";

//header import
import Header from "./components/Header/Header";
import Content from "./pages/Content";
import Marketing from "./pages/Marketing";
import Login from "./pages/Auth/Login";
import PageSingle from "./components/websites/Pages/PageSingle";
import Forgot from "./pages/Auth/Forgot";
import Questionnaire from "./components/websites/Questionnaire";
import Hosting from "./pages/Hosting";
import Dashboard from "./pages/Dashboard";
import Requests from "./pages/Requests";

import AdminContainer from "./components/Admin/AdminContainer";
import Checkout from "./pages/Checkout";
import CheckoutContext from "./contexts/CheckoutContext";

function App() {
  const [user, setUser] = useAuth();
  const [checkoutInfo, setCheckoutInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    businessName: "",
    businessAddress: "",
    businessInfo: "",
    references: "",
    fonts: "",
    colors: "",
    comments: "",
    logo_url: "",

    pageArr: [],
  });
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <Redirect exact from="/" to={"/home"} />
          <Route path="/home">
            <Header component={<Home />} />
          </Route>
          <Route path="/login" component={Login} />

          <Route path="/forgot" component={Forgot} />

          <Route exact path="/pages" component={Content} />
          <Route path="/websites/content/:page" component={PageSingle} />
          <Route path="/requests" component={Requests} />
          <Route path="/marketing">
            <Header component={<Marketing />} />
          </Route>
          <Route path="/admin" component={AdminContainer} />
          <Route path="/questionnaire" component={Questionnaire} />
          <Route path="/hosting" component={Hosting} />
          <Route path="/dashboard" component={Dashboard} />
          <CheckoutContext.Provider value={{ checkoutInfo, setCheckoutInfo }}>
            <Route exact path="/checkout" component={Checkout} />
          </CheckoutContext.Provider>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
