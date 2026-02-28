export default function Register() {

  async function submitHandler(e) {
    e.preventDefault()

    const userData = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
      passwordConfirm: e.currentTarget.passwordConfirm.value
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        data = { message: 'Server returned invalid response'}
      }

      if (res.ok) {
        console.log(res.status, data.message);
      } else {
        console.error('Register failed on server: ', res.status, data.message)
      }

    } catch (err) {
      console.error('Network or fetch error during login:', err);
    }
  }

  return (
    <>
    <h1>Register</h1>
    <form method="POST" onSubmit={submitHandler}>
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