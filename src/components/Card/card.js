import { Link } from "react-router-dom";
import HandleBadges from "../utils/handlebadges";

export default function Card({
  id,
  categories,
  createdAt,
  nonPublic,
  updatedAt,
  short,
  long,
  title,
  setFilter,
}) {
  const token = localStorage.token;

  const badges = categories.map((category) => {
    return (
      <div
        onClick={() => setFilter(category)}
        style={{ cursor: "pointer" }}
        key={Math.random() * 60000}
      >
        <HandleBadges category={category} />
      </div>
    );
  });

  return (
    <div
      className={
        token && nonPublic
          ? "card private "
          : token && !nonPublic
          ? "card public"
          : "card"
      }
    >
      <img src="" alt="" />

      <div className="post-date">
        Posted on {updatedAt === createdAt ? createdAt : updatedAt}
      </div>

      <h3>{title}</h3>

      <p>{short}</p>
      <div className="d-flex flex-wrap justify-content-around mt-2 mb-2">
        {badges}
      </div>

      <Link
        to={{
          pathname: `/blog/${id}`,
          state: {
            title,
            short,
            long,
            nonPublic,
            createdAt,
            updatedAt,
            categories,
            token,
          },
        }}
        className="btn"
      >
        Read More
      </Link>
    </div>
  );
}
