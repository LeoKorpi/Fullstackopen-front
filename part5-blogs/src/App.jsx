import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({ message: null, type: "" });
  const [user, setUser] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      showNotification("Successfully logged in!");
      setUsername("");
      setPassword("");
    } catch (exception) {
      showNotification("Wrong credentials", "error");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    setUser(null);
  };

  const handleNewBlog = () => {
    try {
      const blog = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
      };
      showNotification(`The blog '${blog.title}' by ${blog.author} has been added!`);
      blogService.create(blog);
      setBlogTitle("");
      setBlogAuthor("");
      setBlogUrl("");
    } catch (exception) {
      showNotification("Something went wrong with adding a new blog", "error");
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: "" });
    }, 5000);
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Notification
        message={notification.message}
        type={notification.type}
      />
      {user === null ? (
        <LoginForm
          notification={notification}
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
        </div>
      )}

      {user !== null && (
        <BlogForm
          notification={notification}
          handleNewBlog={handleNewBlog}
          blogTitle={blogTitle}
          setBlogTitle={setBlogTitle}
          blogAuthor={blogAuthor}
          setBlogAuthor={setBlogAuthor}
          blogUrl={blogUrl}
          setBlogUrl={setBlogUrl}
        />
      )}

      <h2>See all blogs</h2>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default App;
