import "./Login.css"
import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function Login() {
				const API = import.meta.env.VITE_BASE_API
				const navigate = useNavigate()

				const [ username, setUsername ] = useState()
				const [ password, setPassword ] = useState()

				async function handleLogin(e) {
								e.preventDefault()
								
								try {
												const res = await fetch(`${API}/login`, {
																method: "POST",
																headers: {
																				"Content-Type": "application/json"
																},
																body: JSON.stringify({username, password})
												})
												const data = await res.json()

												if (!data.success) {
																throw new Error(data.message)
												}
												localStorage.setItem("jwt-token", `Bearer ${data.token}`)
												navigate("/");
								} catch(e) {
												console.error(e)
								}
				}

				return (
								<section className="login-section">
												<form className="login-form">
																<label htmlFor="username"></label>
																<input type="text" name="username" id="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
																<label htmlFor="password"></label>
																<input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

																<button onClick={handleLogin}>Login</button>
												</form>
								</section>
				)
}
