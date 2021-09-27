import { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Link, useParams, useHistory } from "react-router-dom";
import Loading from "../utils/loading";

const Markdown = ({ location }) => {
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
        });
    } else if (state && id) {
      setBlog(state);
      setTitle(state.title);
      setShort(state.short);
      setCategories(state.categories);
      setMarkdown(state.long);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // if there is an Id then this is the edit form
    if (id) {
      fetch(`${SERVER_URL}/blogs/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json", authorization: token },
        body: JSON.stringify({ title, short, long: markdown, categories }),
      })
        .then((res) => res.json())
        .then((data) => {
          // show some Notification in the ui
          console.log(data);
          history.push("/");
        })
        .catch((err) => console.log(err));
      return;
    }
    console.log(title, short, markdown, categories);
    fetch(`${SERVER_URL}/blogs`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: token },
      body: JSON.stringify({ title, short, long: markdown, categories }),
    })
      .then((res) => res.json())
      .then((data) => {
        // show some Notification in the ui
        console.log(data);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  if (id) {
    return blog ? (
      <>
        <Link to={`/blog/${id}`} className="btn btn-back">
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
          <div className="mb-3">
            <label className="form-label">Categories</label>
            <ReactTagInput
              delimiters={[13, 32, 186, 188]}
              tags={categories || []}
              onChange={(newTags) => {
                setCategories(newTags);
                //console.log(categories);
              }}
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
          <div className="mb-3">
            <label className="form-label">Categories</label>
            <ReactTagInput
              delimiters={[13, 32, 186, 188]}
              tags={categories || []}
              onChange={(newTags) => {
                setCategories(newTags);
                //console.log(categories);
              }}
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
