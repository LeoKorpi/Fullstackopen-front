const BlogForm = ({
  handleNewBlog,
  blogTitle,
  setBlogTitle,
  blogAuthor,
  setBlogAuthor,
  blogUrl,
  setBlogUrl,
}) => {
  return (
    <>
      <h2>Create a new blog</h2>
      <form onSubmit={handleNewBlog}>
        <label htmlFor="blogtitle">
          Title:
          <input
            type="text"
            name="blogtitle"
            value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </label>
        <br />
        <label htmlFor="blogauthor">
          Author:
          <input
            type="text"
            name="blogauthor"
            value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </label>
        <br />
        <label htmlFor="blogurl">
          Url:
          <input
            type="text"
            name="blogurl"
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default BlogForm;
