const HandleBadges = ({ category = "" }) => {
  category = category.toLowerCase();
  const classes = {
    html: "badge bg-danger text-light",
    css: "badge bg-primary text-light",
    javascript: "badge bg-warning text-dark",
    github: "badge bg-dark text-light",
    python: "badge bg-info text-dark",
  };
  return (
    <span
      className={
        classes[category] ? classes[category] : "badge bg-dark text-light"
      }
    >
      #{category}
    </span>
  );
};

export default HandleBadges;
