export default function Register() {
  return (
    <>
    <h1>REGISTER PAGE</h1>
      <form method="POST" action="api/auth/register">
        <input type="text" />
        <input type="password" />
        <input type="submit" />
      </form>
    </>
  )
}