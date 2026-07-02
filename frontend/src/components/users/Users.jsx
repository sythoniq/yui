import { Link } from 'react-router'
import { useState, useEffect } from 'react' 

import "./Users.css"

export default function Users() {
				const API = import.meta.env.VITE_BASE_API
				const [users, setUsers] = useState()

				useEffect(() => {
								async function getUsers() {

												const res = await fetch(`${API}/`, {
																headers: {
																				"Content-Type": "application/json",
																				"Authorization": localStorage.getItem("jwt-token") || null
																}
												});
												const data = await res.json()

												if (!data) {
																console.error("Error fetching users")
												}
												setUsers(data.users)
								}

								return () => {
												getUsers()
								}
				}, [])

				if (!users) {
								return (
												<p>Loading...</p>
								)
				}

				const listUsers = users.map(user => 	
								<div key={user.user_id} className="user-card">
												<Link to={`/chat/${user.user_id}`}>
																<h2>{user.user_name}</h2>
												</Link>
								</div>	
				)
				return (
								<main className="users-list">
												{listUsers}
								</main>
				)
}
