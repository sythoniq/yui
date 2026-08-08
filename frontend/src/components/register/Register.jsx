import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import styles from './register.module.css'

export default function Register() {
	const API = import.meta.env.VITE_BASE_API
	const navigate = useNavigate()

	const [ username, setUsername ] = useState()
	const [ password, setPassword ] = useState()

	async function handleRegister(e) {
		e.preventDefault()

		try {
			const res = await fetch(`${API}/register`, {
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
			navigate("/login");
		} catch(e) {
			console.error(e)
		}
	}

	return (
		<section className={styles.registerSect}>
			<h2 style={{textDecoration: "underline"}}>Create an account</h2>
			<form className="register-form">
				<div>
					<label htmlFor="username">Username</label>
					<input type="text" name="username" id="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
				</div>

				<button onClick={handleRegister}>Sign Up</button>
			</form>
			<p>Already have an account? <Link to="/login">Login</Link></p>
		</section>
	)
}
