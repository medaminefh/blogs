import { useState, useEffect } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Link, useParams, useHistory } from "react-router-dom";
import Loading from "../utils/loading";
import { showErrMsg } from "../utils/notification";
import { showSuccessMsg } from "../utils/notification";
import HandleBadges from "../utils/handlebadges";

const Markdown = ({ location }) => {
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [checked, setChecked] = useState(true);
  const [tag, setTag] = useState([]);

  const handleChecked = () => {
    setChecked(!checked);
  };

  let history = useHistory();
  const token = localStorage.token;
  const SERVER_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api"
      : process.env.REACT_APP_SERVER_URL;
  const [title, setTitle] = useState("");
  const [short, setShort] = useState("");
  const [categories, setCategories] = useState("");
  const { state } = location;
  const [blog, setBlog] = useState(state);
  const { id } = useParams();
  const [markdown, setMarkdown] = useState("# Type Something cool😎");

  useEffect(() => {
    if (!state && id) {
      fetch(`${SERVER_URL}/blogs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setBlog(data);
          setTitle(data.title);
          setShort(data.short);
          setCategories(data.categories);
          setMarkdown(data.long);
          setChecked(!checked);
        });
    } else if (state && id) {
      setBlog(state);
      setTitle(state.title);
      setShort(state.short);
      setCategories(state.categories);
      setMarkdown(state.long);
      setChecked(state.nonPublic);
    }
  }, []);
  const markdownChange = (newValue) => {
    setMarkdown(newValue);
  };

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const shortChange = (e) => {
    setShort(e.target.value);
  };

  const handleTags = (e) => {
    const { value } = e.target;
    const lastChar = value[value.length - 1];
    setTag(value);
    if (value === "," || value === " ") {
      setTag("");
      return;
    }
    if (lastChar === "," || lastChar === " ") {
      setCategories((prev) => {
        if (prev.includes(tag)) return prev;
        return [...prev, tag];
      });
      setCategories((prev) => prev.filter((a) => a !== " "));
      setTag("");
    }
  };

  const showCategories =
    categories &&
    categories.map((category) => (
      <div
        onClick={() =>
          setCategories((prev) => prev.filter((cat) => cat !== category))
        }
        style={{ cursor: "pointer" }}
        key={Math.random() * 60000}
      >
        <HandleBadges category={category} />
      </div>
    ));

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("");
    if (!title || !short || !markdown || !categories || !categories.length) {
      setErr("Fill All the fields");
    }
    // if there is an Id then this is the edit form
    if (id) {
      fetch(`${SERVER_URL}/blogs/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json", authorization: token },
        body: JSON.stringify({
          title,
          short,
          long: markdown,
          categories,
          private: checked,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // show some Notification in the ui
          console.log(data);
          setErr("");
          setSuccess(data.msg);
          history.push(`/blog/${id}`);
        })
        .catch((err) => {
          setSuccess("");
          setErr(err);
          console.log(err);
        });
      return;
    }

    fetch(`${SERVER_URL}/blogs`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: token },
      body: JSON.stringify({
        title,
        short,
        long: markdown,
        categories,
        private: checked,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // show some Notification in the ui

        if (data.err) {
          setSuccess("");
          setErr(data.err);
          return;
        }
        setErr("");
        setSuccess(data.msg);
        history.push("/");
      })
      .catch((err) => {
        setSuccess("");
        setErr(err);
      });
  };

  if (id) {
    return blog ? (
      <>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <Link
          to={{
            pathname: `/blog/${id}`,
            state: {
              title,
              short,
              long: markdown,
              createdOrUpdated: blog.createdOrUpdated ?? "",
              createdAt: blog.createdAt,
              updatedAt: blog.updatedAt,
              categories,
              nonPublic: blog.private === "true",
            },
          }}
          className="btn btn-back"
        >
          Go Back
        </Link>
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              value={title}
              onChange={titleChange}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              value={short}
              onChange={shortChange}
              type="text"
              className="form-control"
            />
          </div>
          <div className="d-flex flex-wrap mt-2 mb-2">{showCategories}</div>
          <div className="mb-3">
            <label className="form-label">Categories</label>
            <input value={tag} onChange={handleTags} />
          </div>
          <div className="form-check form-switch">
            <label className="form-check-label">Private</label>
            <input
              checked={checked}
              onChange={handleChecked}
              className="form-check-input"
              type="checkbox"
            />
          </div>
          <SimpleMDE value={markdown} onChange={markdownChange} />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    ) : (
      <Loading />
    );
  } else {
    return (
      <>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <Link to="/" className="btn btn-back">
          Go Back
        </Link>
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              value={title}
              onChange={titleChange}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              value={short}
              onChange={shortChange}
              type="text"
              className="form-control"
            />
          </div>
          <div className="d-flex flex-wrap mt-2 mb-2">{showCategories}</div>
          <div className="mb-3">
            <label className="form-label">Categories</label>
            <input value={tag} onChange={handleTags} />
          </div>
          <div className="form-check form-switch">
            <label className="form-check-label">Private</label>
            <input
              checked={checked}
              onChange={handleChecked}
              className="form-check-input"
              type="checkbox"
            />
          </div>
          <SimpleMDE value={markdown} onChange={markdownChange} />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    );
  }
};

export default Markdown;
