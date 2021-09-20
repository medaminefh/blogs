import { Link } from "react-router-dom";
import HandleBadges from "../utils/handlebadges";

export default function Post({ id, categories }) {
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
  const ui = categories.map((category) => {
    return (
      <div key={Math.random() * 60000}>
        <HandleBadges category={category} />
      </div>
    );
  });

  return (
    <div className="card">
      <img src="" alt="" />

      <div className="post-date">Posted on {today}</div>

      <h3>Hello There 😀</h3>

      <p>This is My blog App</p>
      <div className="d-flex justify-content-around mt-2 mb-2">{ui}</div>
      {localStorage.getItem("user") ? (
        <div className="d-flex justify-content-between">
          <Link to={`/blog/${id}`} className="btn">
            Read More
          </Link>
          <Link to="/" className="btn bg-secondary">
            Edit
          </Link>
        </div>
      ) : (
        <Link to={`/blog/${id}`} className="btn">
          Read More
        </Link>
      )}
    </div>
  );
}
