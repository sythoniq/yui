import { Link, useNavigate } from 'react-router'; import { useState } from 'react'

export default function Register() {
				const API = import.meta.env.VITE_BASE_API
				const [username, setUsername] = useState("")
				const [password, setPassword] = useState("")
				const navigate = useNavigate();


				async function submitRegister(e) {
								e.preventDefault()

								if (username == "" || password == "") {
												alert("Fill the form please, poor form validatin ftw")
								}

								try {
												const res = await fetch(API+"/user/register", {
																method: "POST",
																headers: {
																				"Content-Type": "application/json"
																},
																body: JSON.stringify({username, password})
												})
												const data = await res.json()

												if (!data.success) {
																throw new Error("Error sending login request!")
												}

												navigate("/login");
								} catch(e) {
												console.error(e)
								}

				}

				return (
								<main className="register-page">
												<Link to="/"><button className="back-to-home">Home</button></Link>
												<div className="register-form-container">
												<h2>Sign Up</h2>
												<form className="register-form">
																<label htmlFor="username"></label>
																<input type="text" name="username" id="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
																<label htmlFor="password"></label>
																<input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

																<button onClick={submitRegister}>Sign In</button>
												</form>
												</div>
								</main>
				)
}
