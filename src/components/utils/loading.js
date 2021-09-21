const LoadingPage = () => (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ minHeight: "70vh" }}
  >
    <div
      className="spinner-border"
      style={{ width: "5rem", height: "5rem" }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default LoadingPage;
