import { useState } from 'react'; import { useLoaderData } from 'react-router'

import UserCard from "./components/UserCard.jsx"

function App() {
  const users = useLoaderData()

  if (!users) {
    return (
      <h2>Failed to fetch all users!</h2>
    )
  }

  return (
    <main className="application-entry-point">
      {users && users.map((user) => {
        return (
          <div className="users-list">
            <UserCard key={user.userId} userId={user.userId} userName={user.userName} />
          </div>
        )
      })}
    </main>
  )
}

export default App
