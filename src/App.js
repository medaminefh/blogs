import { useState, useEffect } from "react";
import Card from "./components/Card/card";
import Header from "./components/Header/header";
import Login from "./components/Login/login";
import Blog from "./components/Blog/blog";
import Footer from "./components/Footer/footer";
import Alert from "./components/Alert/alert";
import LoadingPage from "./components/utils/loading";
import AnimeApi from "./components/utils/animeApi";
import Markdown from "./components/Markdown/markdown";
import SmoothList from "react-smooth-list";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

const Routing = () => {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/blog/create" component={Markdown} />
        <Route exact path="/blog/:id" component={Blog} />
        <Route exact path="/blog/:id/edit" component={Markdown} />
        <Route exact path="*" component={LandingPage} />
      </Switch>
    </div>
  );
};

const LandingPage = () => {
  const ServerURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api"
      : process.env.REACT_APP_SERVER_URL;
  const [Blogs, setBlogs] = useState([]);
  const [visible, setVisibility] = useState(true);
  const handleClick = () => setVisibility(false);

  const showBlogs = !Blogs.length
    ? "Nothing"
    : Blogs.map((blog) => {
        return (
          <Card
            key={blog._id}
            categories={blog.categories}
            id={blog._id}
            createdAt={blog.createdAt}
            short={blog.short}
            title={blog.title}
            long={blog.long}
          />
        );
      });

  useEffect(() => {
    fetch(ServerURL + "/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      });
  }, []);

  return Blogs.length ? (
    <>
      {visible && <Alert handleClick={handleClick} />}
      <AnimeApi />
      <SmoothList delay={100} className="posts mb-5">
        {showBlogs}
      </SmoothList>
    </>
  ) : (
    <LoadingPage />
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
