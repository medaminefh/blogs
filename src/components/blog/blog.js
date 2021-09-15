import { Link, Router } from "react-router-dom";

export default function Post() {
  return (
    <div className="card">
      <img src="" alt="" />

      <div className="post-date">Posted on 15/09/2021</div>

      <h3>Hello There 😀</h3>

      <p>This is My blog App</p>

      <a href={`/blog/1`}>
        <a className="btn">Read More</a>
      </a>
    </div>
  );
}
