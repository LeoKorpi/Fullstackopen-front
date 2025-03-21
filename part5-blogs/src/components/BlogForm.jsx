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
    <section>
      <h2>Create a new blog</h2>
      <form onSubmit={handleNewBlog}>
        <label htmlFor="blogtitle">
          Title:
          <input
            type="text"
            id="blogtitle"
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
            id="blogauthor"
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
            id="blogurl"
            name="blogurl"
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </section>
  );
};

export default BlogForm;
