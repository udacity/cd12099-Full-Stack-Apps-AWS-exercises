
function LoginForm(props) {
  return (
    <div>
      <form className="form" onSubmit={props.handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email"/>
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>
        <button className="primary">Enter</button>
      </form>
      {props.isLoginFailed ? <div style={{color: 'red'}}>Invalid username or password</div> : ''}
    </div>
  );
}

export default LoginForm