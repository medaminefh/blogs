import { useState, useEffect } from "react";
import Card from "../Card/card";
import Alert from "../Alert/alert";
import LoadingPage from "../utils/loading";
import handleDate from "../utils/handleDate";
import AnimeApi from "../utils/animeApi";
import SmoothList from "react-smooth-list";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const token = localStorage.token;
  const [filter, setFilter] = useState("");
  const ServerURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api"
      : process.env.REACT_APP_SERVER_URL;
  const [Blogs, setBlogs] = useState([]);
  const [filteredBlogs, setfilteredBlogs] = useState(Blogs);
  const [visible, setVisibility] = useState(true);
  const handleClick = () => setVisibility(false);
  const HandleFilter = () => {
    setfilteredBlogs(Blogs.filter((blog) => blog.categories.includes(filter)));
  };

  useEffect(() => {
    if (filter) HandleFilter();
  }, [filter]);

  const showBlogs = !Blogs.length
    ? "Nothing"
    : !filter
    ? Blogs.map((blog) => {
        const createdOrUpdated = handleDate(blog.createdAt, blog.updatedAt);
        return (
          <Card
            setFilter={setFilter}
            key={blog._id}
            nonPublic={blog.private === "true"}
            categories={blog.categories}
            id={blog._id}
            createdOrUpdated={createdOrUpdated}
            short={blog.short}
            title={blog.title}
            long={blog.long}
          />
        );
      })
    : filteredBlogs.map((blog) => {
        return (
          <Card
            setFilter={setFilter}
            key={blog._id}
            nonPublic={blog.private === "true"}
            categories={blog.categories}
            id={blog._id}
            createdAt={blog.createdAt}
            updatedAt={blog.updatedAt}
            short={blog.short}
            title={blog.title}
            long={blog.long}
          />
        );
      });

  useEffect(() => {
    fetch(ServerURL + "/blogs", { headers: { authorization: token } })
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      });
  }, []);

  return Blogs.length ? (
    <>
      {/* {visible && <Alert handleClick={handleClick} />}
      <AnimeApi /> */}
      <div className="container d-flex w-100 justify-content-between align-items-center">
        {token && (
          <Link to={"/blog/create"} className="btn btn-primary">
            Create
          </Link>
        )}
        {filter && (
          <button
            type="button"
            className="btn-close"
            title="Clear filter"
            onClick={() => setFilter("")}
          ></button>
        )}
      </div>
      <SmoothList delay={100} className="posts mb-5">
        {showBlogs}
      </SmoothList>
    </>
  ) : (
    <LoadingPage />
  );
};

export default LandingPage;
