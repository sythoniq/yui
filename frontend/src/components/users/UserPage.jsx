import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import styles from './page.module.css'

import Load from '../Load.jsx'
import Error from "../Error.jsx"
import Avatar from './Avatar.jsx'
import useGetUser from '../../hooks/useGetUser.js'

export default function UserPage() {
	const API = import.meta.env.VITE_BASE_API
	const navigate = useNavigate()
	const { userId } = useParams()
	const [ user, loading, error, userProfile ] = useGetUser(`${API}/user/${userId}`)
	const [ username, setUserName ] = useState(null)
	const [ password, setPassword ] = useState(null)

	if (loading) {
		return (
			<Load type={"user"} />
		)
	}

	if (error) {
		return (
			<Error error={error} />
		)
	}

	async function handleInfoUpdate(e) {
		e.preventDefault();
		try {
			if (username == null) {
				setUserName(user.user_name)
			}
			const res = await fetch(`${API}/user/details/${user.user_id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": localStorage.getItem("jwt-token")
				},
				body: JSON.stringify({username, password})
			})
			const data = await res.json()

			console.log(data)
		}	catch(e) {
			console.log(e)
		}
	}

	function handleLogout(e) {
		e.preventDefault()

		localStorage.removeItem("jwt-token")
		navigate("/login")
	}

	async function handleProfileUpdate(e) {
		e.preventDefault();
		const file = document.querySelector(".edit-profile-image").files[0]
		if (!file) {
			return;
		}
		let formData = new FormData()
		formData.append('profile', file)
		try {
			const res = await fetch(`${API}/user/update/${userId}`, {
				method: "POST",
				headers: {
					"Authorization": localStorage.getItem("jwt-token")
				},
				body: formData
			})

			const data = await res.json()
			console.log(data)
		} catch (e){
			console.error(e)
		}
	}

	function previewNewProfile(e) {
		if (!e.target.files) {
			return;
		}
		const prevImg = URL.createObjectURL(e.target.files[0])
		const elems = document.querySelectorAll(".user-image");
		elems.forEach((el) => {
			el.src = prevImg
		})
	}

	return (
		<main className={styles.userPage}>
			<div className={styles.pageContainer}>
				<section className={styles.aside}>
					<h2 style={{textTransform: 'capitalize'}}>{user.user_name}</h2>
					<div className={styles.profileContainer}>
						<label htmlFor="file">
							<Avatar imgUrl={userProfile} />
						</label>
						<input className="edit-profile-image" id="file" type="file" name="profile" accept="image/*" onChange={previewNewProfile} hidden />
					</div>
					<div className="edit-image">
						<button onClick={handleProfileUpdate}>Edit Profile</button>
					</div>
				</section>
				<section className={styles.detContainer}>
				<section className={styles.userDetails}>
					<h2>Edit Profile</h2>
					<form className="user-details-form">
						<div>
							<label htmlFor="userName">Username</label>
							<input type="text" defaultValue={user.user_name} onChange={(e) => setUserName(e.target.value)} />
						</div>
						<div>
							<label htmlFor="password">Password</label>
							<input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
						</div>
					
						<button onClick={handleInfoUpdate}>Update Info</button>
					</form>
				</section>
				<div className={styles.logoutBtn}>
					<button onClick={handleLogout}>Logout</button>
				</div>
				</section>
			</div>
		</main>
	)
}
