import { useLoaderData } from 'react-router'

export default function App() {
  const users = useLoaderData();

  return (
    <>
      <header className="page-heading">
        <h2>結Yui</h2>
      </header>
      <main className="main-container">
        {users && users.map((user) => {
          return (
            <p key={user.userId}>User: {user.userName}</p>
          )
        })}
      </main>
    </>
  )
}
