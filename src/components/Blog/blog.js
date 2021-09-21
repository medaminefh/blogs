import { Link } from "react-router-dom";

const Blog = ({ match, location }) => {
  console.log(location, location.state.createdAt);
  const { id } = match.params;
  const { state } = location;
  /* const dateobj = Date(state.createdAt);
  console.log(dateobj);
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  const createdAt =
    pad(dateobj.getDate()) +
    "/" +
    pad(dateobj.getMonth() + 1) +
    "/" +
    dateobj.getFullYear();
 */
  return (
    <>
      <Link to="/" className="btn btn-back">
        Go Back
      </Link>
      <div className="card card-page">
        <h1 className="post-title">{state.title}</h1>
        <div className="post-date">Posted on {state.createdAt}</div>
        <img src={""} alt="" />
        <div className="post-body">
          <div>{state.long}</div>
        </div>
      </div>
    </>
  );
};

export default Blog;
