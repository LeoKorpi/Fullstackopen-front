const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <section>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            value={username}
            name="Username"
            id="Username"
            onChange={setUsername}
          />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            value={password}
            name="Password"
            id="Password"
            onChange={setPassword}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </section>
  );
};

export default LoginForm;
