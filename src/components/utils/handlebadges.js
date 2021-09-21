const HandleBadges = ({ category = "" }) => {
  category = category.toLowerCase();
  const classes = {
    html: "badge bg-danger text-light",
    css: "badge bg-primary text-light",
    javascript: "badge bg-warning text-dark",
    github: "badge bg-dark text-light",
    python: "badge bg-lightBlue text-dark",
    python3: "badge bg-darkBlue text-light",
    programming: "badge bg-pistach text-dark",
    nodejs: "badge bg-darkGreen text-light",
    express: "badge bg-darkPurple text-light",
  };
  return (
    <span
      className={
        classes[category]
          ? classes[category] + " ml-1"
          : "badge bg-dark text-light ml-1"
      }
    >
      #{category}
    </span>
  );
};

export default HandleBadges;
