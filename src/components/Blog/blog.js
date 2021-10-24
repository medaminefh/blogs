import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Loading from "../utils/loading";
import marked from "marked";
import handleDate from "../utils/handleDate";
import { showErrMsg } from "../utils/notification";
import { showSuccessMsg } from "../utils/notification";

const Blog = ({ match, location }) => {
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  let history = useHistory();

  const SERVER_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api"
      : process.env.REACT_APP_SERVER_URL;
  const { id } = match.params;
  const { state, pathname } = location;
  const [blog, setBlog] = useState(state || "");
  let {
    title,
    short,
    long,
    createdAt,
    updatedAt,
    createdOrUpdated,
    categories,
    nonPublic,
  } = blog;
  const token = localStorage.token;
  createdOrUpdated = createdOrUpdated ?? handleDate(createdAt, updatedAt);
  useEffect(() => {
    if (!state) {
      fetch(`${SERVER_URL}/blogs/${id}`, {
        method: "GET",
        headers: { "content-type": "application/json", authorization: token },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.err) {
            history.push("/");
            return;
          }
          setBlog(data);
          if (token) {
            setBlog((prev) => ({ ...prev, token }));
          }
        })
        .catch((err) => {
          console.log(err);
          history.push("/");
        });
    }
  }, []);

  const handleRemove = (e) => {
    const confirmation = window.confirm(
      "Are You Sure You want To Delete This?"
    );
    if (confirmation) {
      fetch(`${SERVER_URL}/blogs/${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json", authorization: token },
      })
        .then((res) => res.json())
        .then((data) => {
          // show some Notification in the ui
          console.log(data);
          setErr("");
          setSuccess(data.msg);
          history.push("/");
        })
        .catch((err) => {
          setSuccess("");
          setErr(err);
          console.log(err);
        });
      return;
    }
    return;
  };

  return blog ? (
    <>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <div className="d-flex justify-content-between">
        <Link to="/" className="btn btn-back">
          Go Back
        </Link>
        {token && (
          <div className="w-25 d-flex justify-content-between">
            <button
              onClick={handleRemove}
              style={{
                backgroundColor: "rgba(214, 10, 10, 0.712)",
                color: "#fff",
              }}
              className="btn btn-back"
            >
              Delete
            </button>

            <Link
              to={{
                pathname: `${pathname}/edit`,
                state: {
                  title,
                  short,
                  long,
                  createdOrUpdated,
                  categories,
                  nonPublic,
                },
              }}
              className="btn btn-back"
            >
              Edit
            </Link>
          </div>
        )}
      </div>
      <div className="card card-page">
        <div className="post-date">{createdOrUpdated}</div>
        <img src={""} alt="" />
        <div className="post-body">
          <div
            dangerouslySetInnerHTML={{
              __html: marked(blog.long),
            }}
          />
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Blog;
