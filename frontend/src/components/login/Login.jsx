import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import styles from './login.module.css'

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
		<section className={styles.loginSect}>
			<h2 style={{textDecoration: "underline"}}>Sign in to Yui</h2>
			<form className="login-form">
				<div>
					<label htmlFor="username">Username</label>
					<input type="text" name="username" id="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input type="password" name="password" placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)} />
				</div>

				<button onClick={handleLogin}>Login</button>
			</form>
			<p>New to Yui? <Link to="/register">Create an account</Link></p>
		</section>
	)
}
