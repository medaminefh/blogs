import Post from "./components/blog/blog";
import Header from "./components/header/header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/blog/:id" component={Blog} />
      <Route exact path="/*" component={LandingPage} />
    </Switch>
  );
};

const Blog = ({ match }) => {
  const { id } = match.params;

  return <h1>Blogs N°{id}</h1>;
};

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

const LandingPage = () => (
  <>
    <Header />
    <div className="posts">
      <Post />
      <Post />
      <Post />
    </div>
  </>
);

function App() {
  return (
    <Router>
      <Routing />
    </Router>
  );
}

export default App;
