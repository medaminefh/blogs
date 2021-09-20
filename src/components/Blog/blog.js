import { Link } from "react-router-dom";

const Blog = ({ match }) => {
  const { id } = match.params;
  const dateobj = new Date();
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  const today =
    pad(dateobj.getDate()) +
    "/" +
    pad(dateobj.getMonth() + 1) +
    "/" +
    dateobj.getFullYear();

  return (
    <>
      <Link to="/" className="btn btn-back">
        Go Back
      </Link>
      <div className="card card-page">
        <h1 className="post-title">Blog N°{id}</h1>
        <div className="post-date">Posted on {today}</div>
        <img src={""} alt="" />
        <div className="post-body">
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Blog;
