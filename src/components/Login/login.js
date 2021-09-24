import { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";

const Login = () => {
  const [user, setUser] = useState("");
  const responseGoogle = async (response) => {
    try {
      console.log(response);
      setUser(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mt-5 mb-5 d-flex flex justify-content-center align-items-center">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with google"
        onSuccess={responseGoogle}
      />
    </div>
  );
};

export default Login;
