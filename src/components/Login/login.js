import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";

const Login = () => {
  let history = useHistory();
  const responseGoogle = async (response) => {
    console.log(response.tokenId);
    try {
      fetch(process.env.REACT_APP_LOGIN_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: response.tokenId }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.token) {
            localStorage.token = data.token;
            return history.push("/");
          }
          console.log("Not Authorized");
        });
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
