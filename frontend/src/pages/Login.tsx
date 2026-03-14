import { useNavigate } from "react-router-dom"
import apiFetch from "../utils/apiFetch";
import type { setUser } from "../types/setUser"

type Props = {
  setUser: setUser
}

export default function Login({ setUser }: Props) {
  const navigate = useNavigate();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const userData = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value
    };

  const { ok, data } = await apiFetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (ok) {
      setUser({ username: userData.username });     
      navigate('/projects') 
      console.log(data.message);
    } else {
      console.error(data.message);
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