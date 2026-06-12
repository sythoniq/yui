import { useState, useEffect } from 'react'; import { useLoaderData } from 'react-router'

import UserCard from "./components/UserCard.jsx";
import Header from "./components/Header.jsx";

export default function App() {
  const API = import.meta.env.VITE_BASE_API
  const [loggedIn, setLoggedIn] = useState(false);
  const users = useLoaderData()

  useEffect(() => {
    async function verifyUser() {
      const token = localStorage.getItem("jwt-token");
      if (!token) {
        return;
      }

      try {
        const res = await fetch(API + "/user/auth", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          }
        });
        const data = await res.json()

        if (!data.success) {
          throw new Error("Failed to verify the user!")
        }
        setLoggedIn(true);
      } catch (e) {
        console.error(e)
      }
    }

    verifyUser()
  }, [])

  if (!users) {
    return (
      <h2>Failed to fetch all users!</h2>
    )
  }

  return (
    <main className="application-entry-point">
      <Header loggedIn={loggedIn} />
      <div className="users-list">
        {users && users.map((user) => {
          return (
            <UserCard key={user.userId} userId={user.userId} userName={user.userName} />
          )
        })}
      </div>
    </main>
  )
}

