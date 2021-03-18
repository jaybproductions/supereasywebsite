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
import Additional from "./pages/Additional";
import Content from "./pages/Content";
import Marketing from "./pages/Marketing";
import Projects from "./pages/Projects";
import UserSingle from "./components/Admin/Projects/UserSingle";
import Login from "./pages/Auth/Login";
import PageSingle from "./components/websites/Pages/PageSingle";
import Forgot from "./pages/Auth/Forgot";
import Questionnaire from "./components/websites/Questionnaire";
import Hosting from "./pages/Hosting";

function App() {
  const [user, setUser] = useAuth();
  return (
    <div
      className="App"
      style={{ paddingTop: "50px", margin: "auto", marginLeft: "200px" }}
    >
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <Redirect exact from="/" to={!user ? "/login" : "/home"} />
          <Route path="/home">
            <Header component={<Home />} />
          </Route>
          <Route path="/signup">
            <Header component={<Signup />} />
          </Route>
          <Route path="/forgot">
            <Header component={<Forgot />} />
          </Route>
          <Route exact path="/websites">
            <Header component={<Websites />} />
          </Route>
          <Route path="/websites/design">
            <Header component={<Design />} />
          </Route>
          <Route exact path="/pages">
            <Header component={<Content />} />
          </Route>
          <Route path="/websites/content/:page">
            <Header component={<PageSingle />} />
          </Route>
          <Route path="/websites/additional">
            <Header component={<Additional />} />
          </Route>
          <Route path="/marketing">
            <Header component={<Marketing />} />
          </Route>
          <Route exact path="/projects">
            <Header component={<Projects />} />
          </Route>
          <Route path="/project/:project">
            <Header component={<UserSingle />} />
          </Route>
          <Route path="/login">
            <Header component={<Login />} />
          </Route>
          <Route path="/questionnaire">
            <Header component={<Questionnaire />} />
          </Route>
          <Route path="/hosting">
            <Header component={<Hosting />} />
          </Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
