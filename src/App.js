import Card from "./components/Card/card";
import Header from "./components/Header/header";
import Login from "./components/Login/login";
import Blog from "./components/Blog/blog";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/blog/:id" component={Blog} />
      <Route exact path="*" component={LandingPage} />
    </Switch>
  );
};

const LandingPage = () => (
  <>
    <Header />
    <div className="container posts">
      <Card categories={["HTML", "CSS", "Javascript", "Python"]} id={1} />
      <Card categories={["Javascript", "CSS", "Python"]} id={2} />
      <Card categories={["HTML", "Python"]} id={3} />
    </div>
  </>
);

function App() {
  return (
    <Router>
      <Routing />
    </Router>
  );
}

export default App;
