import './Header.css'
import { Link } from 'react-router'
import { useState, useEffect } from 'react'

export default function Header() {
				const API = import.meta.env.VITE_BASE_API
				const [ isLoggedIn, setLoggedIn ] = useState()
				const [ user, setUser ] = useState() 

				const token = localStorage.getItem("jwt-token")

				useEffect(() => {
								async function authUser() {
												if (!token) {
																setLoggedIn(false)
																setUser(null)
																return;
												}
												const res = await fetch(`${API}/auth`, {
																method: "GET",
																headers: {
																				"Content-Type": "application/json",
																				"Authorization": token
																}
												})

												const data = await res.json()
												if (!data.success) {
																console.error("Error", data.message)
												}
												setLoggedIn(true)
												setUser(data.user)
								}

								return () => {
												authUser()
								}
				}, [])

				return (
								<header className="page-heading">
												<Link to="/"><h2>Yui</h2></Link>
												<nav className="page-nav">
																{isLoggedIn ? (
																				<Link to={`/profile/${user.userid}`}>
																								<h4>{user.user_name}</h4>
																				</Link>
																) : (
																				<Link to="/login"><h4>Login</h4></Link>
																)}
												</nav>
								</header>
				)
}
