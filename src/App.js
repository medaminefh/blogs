import Post from "./components/blog/blog";
import Header from "./components/header/header";

function App() {
  return (
    <>
      <Header />
      <div className="posts">
        <Post />
        <Post />
        <Post />
      </div>
    </>
  );
}

export default App;
