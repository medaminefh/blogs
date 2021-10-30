import { useState, useEffect } from "react";
import Card from "../Card/card";
import LoadingPage from "../utils/loading";
import HandleDate from "../utils/handleDate";
import SmoothList from "react-smooth-list";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const token = localStorage.token;
  const [ErrorFetching, setError] = useState("");
  const [filter, setFilter] = useState("");
  const ServerURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api"
      : process.env.REACT_APP_SERVER_URL;
  const [Blogs, setBlogs] = useState([]);
  const [filteredBlogs, setfilteredBlogs] = useState(Blogs);

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
        const createdOrUpdated = <HandleDate updated={blog.updatedAt} />;
        return (
          <Card
            setFilter={setFilter}
            key={blog._id}
            img_url={blog.img_url}
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
        const createdOrUpdated = <HandleDate updated={blog.updatedAt} />;
        return (
          <Card
            setFilter={setFilter}
            key={blog._id}
            img_url={blog.img_url}
            nonPublic={blog.private === "true"}
            categories={blog.categories}
            id={blog._id}
            createdOrUpdated={createdOrUpdated}
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
        setBlogs((prev) => [...prev, ...data]);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        return;
      });
  }, []);

  return Blogs.length ? (
    <>
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
      <SmoothList delay={130} className="posts mb-5">
        {showBlogs}
      </SmoothList>
    </>
  ) : ErrorFetching ? (
    <h2>There is something wrong, Please do Refresh or come later</h2>
  ) : (
    <LoadingPage />
  );
};

export default LandingPage;
