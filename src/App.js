import { useState } from "react";
import Card from "./components/Card/card";
import Header from "./components/Header/header";
import Login from "./components/Login/login";
import Blog from "./components/Blog/blog";
import Footer from "./components/Footer/footer";
import Alert from "./components/Alert/alert";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

const Routing = () => {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/blog/:id" component={Blog} />
        <Route exact path="*" component={LandingPage} />
      </Switch>
    </div>
  );
};

const LandingPage = () => {
  const [visible, setVisibility] = useState(true);
  const handleClick = () => setVisibility(false);

  return (
    <>
      {visible && <Alert handleClick={handleClick} />}
      <div className="posts mb-5">
        <Card categories={["HTML", "CSS", "Javascript", "Python"]} id={1} />
        <Card categories={["Javascript", "CSS", "Python"]} id={2} />
        <Card categories={["HTML", "Python"]} id={3} />
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Header />
      <Routing />
      <Footer />
    </Router>
  );
}

export default App;
