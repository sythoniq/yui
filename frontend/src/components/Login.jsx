import { useState } from 'react'; import { Link, useNavigate } from 'react-router'


export default function Login() {
				const API = import.meta.env.VITE_BASE_API
				const [username, setUsername] = useState("")
				const [password, setPassword] = useState("")
				const navigate = useNavigate();

				async function submitLogin(e) {
								e.preventDefault()
				
								if (username == "" || password == "") {
												alert("Fill the form please, poor form validatin ftw")
								}

								try {
												const res = await fetch(API+"/user/login", {
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

												localStorage.setItem("jwt-token", data.token)
												navigate("/");
								} catch(e) {
												console.error(e)
								}
				}

				return (
								<main className="login-page">
												<Link to="/"><button className="back-to-home">Home</button></Link>
												<div className="login-form-container">
												<h2>Login</h2>
												{ /* TODO: add proper form validation after main parts */ }
												<form className="login-form">
																				<label htmlFor="username"></label>
																				<input type="text" name="username" id="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
																				<label htmlFor="password"></label>
																				<input type="password" name="password" id="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} />
																				
																				<button onClick={submitLogin}>Login</button>
												</form>
												</div>
								</main>
				)
}
