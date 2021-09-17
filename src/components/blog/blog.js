export default function Post({ id }) {
  return (
    <div className="card">
      <img src="" alt="" />

      <div className="post-date">Posted on 15/09/2021</div>

      <h3>Hello There 😀</h3>

      <p>This is My blog App</p>

      <a href={`/blog/${id}`}>
        <a className="btn">Read More</a>
      </a>
    </div>
  );
}
