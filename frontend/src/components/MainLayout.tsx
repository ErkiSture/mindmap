export default function MainLayout() {
  return (
    <>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  )
}