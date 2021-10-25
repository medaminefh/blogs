import { Link } from "react-router-dom";
import HandleBadges from "../utils/handlebadges";

export default function Card({
  id,
  img_url,
  categories,
  nonPublic,
  createdOrUpdated,
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
      <div className="post-date">{createdOrUpdated}</div>

      <h3>{title}</h3>

      <p>{short}</p>

      {img_url && <img src={img_url} alt={title} />}

      <div className="d-flex flex-wrap justify-content-around mt-2 mb-2">
        {badges}
      </div>

      <Link
        to={{
          pathname: `/blog/${id}`,
          state: {
            title,
            img_url,
            short,
            long,
            nonPublic,
            createdOrUpdated,
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
