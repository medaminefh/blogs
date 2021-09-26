import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../utils/loading";

const Blog = ({ match, location }) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { id } = match.params;
  const { state, pathname } = location;
  const [blog, setBlog] = useState(state || "");
  const { title, short, long, createdAt, categories } = blog;
  const token = localStorage.token;

  useEffect(() => {
    if (!state) {
      fetch(`${SERVER_URL}/blogs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setBlog(data);
          if (token) {
            setBlog((prev) => ({ ...prev, token }));
          }
        });
    }
  }, []);

  return blog ? (
    <>
      <div className="d-flex justify-content-between">
        <Link to="/" className="btn btn-back">
          Go Back
        </Link>
        {token && (
          <Link
            to={{
              pathname: `${pathname}/edit`,
              state: { title, short, long, createdAt, categories },
            }}
            className="btn btn-back"
          >
            Edit
          </Link>
        )}
      </div>
      <div className="card card-page">
        <h1 className="post-title">{blog.title}</h1>
        <div className="post-date">Posted on {blog.createdAt}</div>
        <img src={""} alt="" />
        <div className="post-body">
          <div>{blog.long}</div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Blog;
