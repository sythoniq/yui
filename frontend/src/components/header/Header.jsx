import './Header.css'
import { Link } from 'react-router'
import { useState, useEffect } from 'react'

import Avatar from '../users/Avatar.jsx'

export default function Header() {
	const API = import.meta.env.VITE_BASE_API

	const [ isLoggedIn, setLoggedIn ] = useState()
	const [ user, setUser ] = useState() 
	const [ userProfile, setUserProfile ] = useState(null)

	const token = localStorage.getItem("jwt-token")

	useEffect(() => {
		async function authUser() {
			try {
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
					console.error(e);
					return;
				}
				setLoggedIn(true)
				setUser(data.user)	
				if (data.user.profile_image.length > 0) {
					setUserProfile(data.user.profile_image[0].image_url)
				}
			} catch(e) {
				console.error(e.message)	
			}
		}
		
		authUser()
	}, [token])


	return (
		<header className="page-heading">
			<Link to="/"><h2>Yui</h2></Link>
			<nav className="page-nav">
				{isLoggedIn ? (
					<Link to={`/profile/${user.user_id}`}>
						<Avatar imgUrl={userProfile} userName={user.user_name} />
					</Link>
				) : (
						<Link to="/login"><h4>Login</h4></Link>
					)}
			</nav>
		</header>
	)
}
