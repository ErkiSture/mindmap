import { useNavigate } from "react-router-dom"

type User = { username: string };

type LoginProps = {
  setUser: (user: User) => void;
}

export default function Login({ setUser }: LoginProps) {
  const navigate = useNavigate();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const userData = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value
    };

    try {
      const res = await fetch('/api/auth/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });

      let data;
      try {
        data = await res.json()
      } catch (err) {
        data = { message: 'Server returned invalid response'}
      }

      if (res.ok) {
        setUser({ username: userData.username });
        console.log(res.status, data.message);
        navigate('/projects');
      } else {
        console.error('Login failed on server: ', res.status, data.message);
        return;
      }

    } catch (err) {
      console.error('Network or fetch error during login:', err);
    }
  }


  return (
    <>
    <h1>Login</h1>
    <form method="POST" onSubmit={handleSubmit}>
      <div className="label-field">
      <label htmlFor="username">Username</label>
      <input type="text" name="username" placeholder="Enter username..."/>
      </div>
      <div className="label-field">
      <label htmlFor="password">Password</label>
      <input type="password" name="password" placeholder="Enter password..."/>
      </div>
      <div className="register-form-actions">
      <button type="submit">Login</button>
      <a href="/register">Go to register page</a>
      </div>
    </form>
    </>
  )
}