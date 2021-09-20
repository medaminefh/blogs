import { Link } from "react-router-dom";

const Blog = ({ match }) => {
  const { id } = match.params;

  return (
    <>
      <Link to={"/"}>Go Back</Link>
      <h1>Blogs N°{id}</h1>
    </>
  );
};

export default Blog;
