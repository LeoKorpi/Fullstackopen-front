import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    });

    setBlogTitle("");
    setBlogAuthor("");
    setBlogUrl("");
  };

  return (
    <section>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <label htmlFor="blogtitle">
          Title:
          <input
            type="text"
            id="blogtitle"
            name="blogtitle"
            value={blogTitle}
            onChange={(event) => setBlogTitle(event.target.value)}
          />
        </label>
        <br />
        <label htmlFor="blogauthor">
          Author:
          <input
            type="text"
            id="blogauthor"
            name="blogauthor"
            value={blogAuthor}
            onChange={(event) => setBlogAuthor(event.target.value)}
          />
        </label>
        <br />
        <label htmlFor="blogurl">
          Url:
          <input
            type="text"
            id="blogurl"
            name="blogurl"
            value={blogUrl}
            onChange={(event) => setBlogUrl(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </section>
  );
};

export default BlogForm;
