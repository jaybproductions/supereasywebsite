import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import React, { useState } from "react";
import useAuth from "./hooks/useAuth";
import UserContext from "./contexts/UserContext";
//Page Imports
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import Content from "./pages/Content";
import Login from "./pages/Auth/Login";
import PageSingle from "./components/websites/Pages/PageSingle";
import Forgot from "./pages/Auth/Forgot";
import Questionnaire from "./components/websites/Questionnaire";
import Hosting from "./pages/Hosting";
import Dashboard from "./pages/Dashboard";
import AdminContainer from "./components/Admin/AdminContainer";
import Checkout from "./pages/Checkout";
import CheckoutContext from "./contexts/CheckoutContext";
import Footer from "./components/Footer";

const App = () => {
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
    domain: "",
    fonts: "",
    colors: "",
    comments: "",
    logo_url: "",
    selectedPackage: null,
    pageArr: ["home", "about", "contact"],
  });
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <CheckoutContext.Provider value={{ checkoutInfo, setCheckoutInfo }}>
            <Redirect exact from="/" to={"/home"} />
            <Route path="/home">
              <Header component={<Home />} />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/forgot" component={Forgot} />
            <Route exact path="/pages" component={Content} />
            <Route path="/websites/content/:page" component={PageSingle} />
            <Route path="/admin" component={AdminContainer} />
            <Route path="/questionnaire" component={Questionnaire} />
            <Route path="/hosting" component={Hosting} />
            <Route path="/dashboard" component={Dashboard} />

            <Route exact path="/checkout/:packageName" component={Checkout} />
          </CheckoutContext.Provider>
        </Switch>
      </UserContext.Provider>
      <Footer />
    </div>
  );
};

export default App;
