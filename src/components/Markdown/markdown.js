import { useState, useEffect } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Link, useParams } from "react-router-dom";
import Loading from "../utils/loading";

const Markdown = ({ match, location }) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [title, setTitle] = useState("");
  const { state } = location;
  const [blog, setBlog] = useState(state);
  const { id } = useParams();
  const [markdown, setMarkdown] = useState("# Type Something cool😎");

  useEffect(() => {
    if (!state) {
      fetch(`${SERVER_URL}/blogs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setBlog(data);
          setTitle(data.title);
          setMarkdown(data.long);
        });
    } else {
      setBlog(state);
      setTitle(state.title);
      setMarkdown(state.long);
    }
  }, []);
  const markdownChange = (newValue) => {
    setMarkdown(newValue);
  };

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // here where send a post request to the server
  };

  return blog ? (
    <>
      <Link to={`/blog/${id}`} className="btn btn-back">
        Go Back
      </Link>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            value={title}
            onChange={titleChange}
            type="text"
            className="form-control"
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
};

export default Markdown;
