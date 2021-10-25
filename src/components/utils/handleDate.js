const handleDate = (CreatedAt, UpdatedAt) => {
  const isUpdated = new Date(CreatedAt) < new Date(UpdatedAt);
  const createdAtDateObj = new Date(CreatedAt);
  const updatedAtDateObj = new Date(UpdatedAt);
  const options = { year: "numeric", month: "short", day: "numeric" };

  if (isUpdated) {
    const updatedAt = updatedAtDateObj.toLocaleDateString("en-US", options);

    return `Updated on ${updatedAt}`;
  } else {
    const createdAt = createdAtDateObj.toLocaleDateString("en-US", options);

    return `Created on ${createdAt}`;
  }
};

export default handleDate;
