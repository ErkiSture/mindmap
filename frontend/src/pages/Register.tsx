import type React from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/user";
import apiFetch from "../utils/apiFetch";


type RegisterProp = {
  setUser: (user: User) => void;
}

export default function Register({ setUser }: RegisterProp) {
  const navigate = useNavigate()

  async function submitHandler(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()

    const userData = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
      passwordConfirm: e.currentTarget.passwordConfirm.value
    }

    const { ok, data } = await apiFetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (ok) {
        setUser({ username: userData.username })
        navigate('/projects') 
        console.log(data.message);
      } else {
        console.error(data.message);
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