import { GoogleLogin } from "react-google-login";

const Login = () => {
  const responseGoogle = async (response) => {
    try {
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mt-5 d-flex flex justify-content-center align-items-center">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with google"
        onSuccess={responseGoogle}
      />
    </div>
  );
};

export default Login;
