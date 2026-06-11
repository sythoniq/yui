import { Outlet, Link, useLoaderData } from 'react-router'
import Header from "./components/Header.jsx"
import User from "./components/User.jsx"

export default function App() {
  const users = useLoaderData();

  return (
    <>
      <Header />
      <main className="main-container">
        <div className="users-list">
          {users && users.map((user) => {
            return (
              <User key={user.userId} userName={user.userName} userId={user.userId} />
            )
          })}
        </div>
        <div className="chats-main-content">
          <Outlet />
        </div>
      </main>
    </>
  )
}
