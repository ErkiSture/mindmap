export default function Register() {
  return (
    <>
    <h1>Register</h1>
    <form method="POST" action="api/auth/register">
      <div className="label-field">
      <label htmlFor="username">Username</label>
      <input type="text" name="username" placeholder="Enter username..."/>
      </div>
      <div className="label-field">
      <label htmlFor="password">Password</label>
      <input type="password" name="password" placeholder="Enter password..."/>
      </div>
      <div className="label-field">
      <label htmlFor="confirm">Confirm password</label>
      <input type="password" name="passwordConfirm" placeholder="Confirm password..."/>
      </div>
      <div className="register-form-actions">
      <button type="submit">Register</button>
      <a href="/login">Go to login page</a>
      </div>
    </form>
    </>
  )
}