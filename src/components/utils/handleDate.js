const handleDate = (CreatedAt, UpdatedAt) => {
  const isUpdated = new Date(CreatedAt) < new Date(UpdatedAt);
  const createdAtDateObj = new Date(CreatedAt);
  const updatedAtDateObj = new Date(UpdatedAt);
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  if (isUpdated) {
    const updatedAt =
      pad(updatedAtDateObj.getDate()) +
      "/" +
      pad(updatedAtDateObj.getMonth() + 1) +
      "/" +
      updatedAtDateObj.getFullYear();

    return `Updated on ${updatedAt}`;
  } else {
    const createdAt =
      pad(createdAtDateObj.getDate()) +
      "/" +
      pad(createdAtDateObj.getMonth() + 1) +
      "/" +
      createdAtDateObj.getFullYear();

    return `Created on ${createdAt}`;
  }
};

export default handleDate;
