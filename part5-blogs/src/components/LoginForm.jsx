import Notification from "./Notification";

const LoginForm = ({ errorMessage, handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <>
      <h2>Log in to application</h2>
      <Notification message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
