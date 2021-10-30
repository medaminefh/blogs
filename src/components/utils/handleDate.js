const HandleDate = ({ updated: UpdatedAt }) => {
  const updatedAtDateObj = new Date(UpdatedAt);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const updatedAt = updatedAtDateObj.toLocaleDateString("en-US", options);

  return (
    <>
      <i className="far fa-clock me-2"></i>
      {updatedAt}
    </>
  );
};

export default HandleDate;
