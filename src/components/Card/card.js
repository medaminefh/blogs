import { Link } from "react-router-dom";
import HandleBadges from "../utils/handlebadges";

export default function Post({
  id,
  categories,
  createdAt,
  short,
  long,
  title,
}) {
  const dateobj = createdAt ? new Date(createdAt) : new Date();
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  // format the date
  createdAt =
    pad(dateobj.getDate()) +
    "/" +
    pad(dateobj.getMonth() + 1) +
    "/" +
    dateobj.getFullYear();

  const badges = categories.map((category) => {
    return (
      <div key={Math.random() * 60000}>
        <HandleBadges category={category} />
      </div>
    );
  });

  return (
    <div className="card">
      <img src="" alt="" />

      <div className="post-date">Posted on {createdAt}</div>

      <h3>{title}</h3>

      <p>{short}</p>
      <div className="d-flex flex-wrap justify-content-around mt-2 mb-2">
        {badges}
      </div>

      <Link
        to={{
          pathname: `/blog/${id}`,
          state: { title, short, long, createdAt, categories },
        }}
        className="btn"
      >
        Read More
      </Link>
    </div>
  );
}
