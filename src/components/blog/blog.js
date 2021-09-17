import { Link } from "react-router-dom";

export default function Post({ id }) {
  return (
    <div className="card">
      <img src="" alt="" />

      <div className="post-date">Posted on 15/09/2021</div>

      <h3>Hello There 😀</h3>

      <p>This is My blog App</p>
      <Link to={`/blog/${id}`} className="btn">
        Read More
      </Link>
    </div>
  );
}
