const Alert = ({ handleClick }) => (
  <div className="alert alert-warning alert-dismissible fade show" role="alert">
    Not completed Yet, Stay Tuned 😀 COMING VERY SOON⏳
    <button onClick={handleClick} type="button" className="btn-close"></button>
  </div>
);

export default Alert;
