import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";

import useAuth from "./hooks/useAuth";
import UserContext from "./contexts/UserContext";
//Page Imports
import Home from "./pages/Home";
import Signup from "./pages/Auth/Signup";
import Websites from "./pages/Websites";

//header import
import Header from "./components/Header/Header";
import Design from "./pages/Design";
import Content from "./pages/Content";
import Marketing from "./pages/Marketing";
import Projects from "./pages/Projects";
import UserSingle from "./components/Admin/Projects/UserSingle";
import Login from "./pages/Auth/Login";
import PageSingle from "./components/websites/Pages/PageSingle";
import Forgot from "./pages/Auth/Forgot";
import Questionnaire from "./components/websites/Questionnaire";
import Hosting from "./pages/Hosting";
import Dashboard from "./pages/Dashboard";
import Requests from "./pages/Requests";

import AdminContainer from "./components/Admin/AdminContainer";

function App() {
  const [user, setUser] = useAuth();
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <Redirect exact from="/" to={"/home"} />
          <Route path="/home">
            <Header component={<Home />} />
          </Route>
          <Route path="/login">
            <Header component={<Login />} />
          </Route>
          <Route path="/signup">
            <Header component={<Signup />} />
          </Route>
          <Route path="/forgot">
            <Header component={<Forgot />} />
          </Route>
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/websites">
            <Header component={<Websites />} />
          </Route>
          <Route path="/websites/design">
            <Header component={<Design />} />
          </Route>
          <Route exact path="/pages" component={Content} />
          <Route path="/websites/content/:page" component={PageSingle} />
          <Route path="/requests" component={Requests} />
          <Route path="/marketing">
            <Header component={<Marketing />} />
          </Route>
          <Route path="/admin" component={AdminContainer} />
          <Route path="/questionnaire" component={Questionnaire} />
          <Route path="/hosting" component={Hosting} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
