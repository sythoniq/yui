import { useState } from 'react'
import { useParams, useLoaderData } from 'react-router'
import './Profile.css'

import Load from '../Load.jsx'
import Error from "../Error.jsx"
import Avatar from './Avatar.jsx'
import useGetUser from '../../hooks/useGetUser.js'

export default function UserPage() {
	const API = import.meta.env.VITE_BASE_API
	const { userId } = useParams()
	const [ user, loading, error, userProfile ] = useGetUser(`${API}/user/${userId}`)
	const [ username, setUserName ] = useState(null)
	const [ password, setPassword ] = useState(null)
	const [ confirm, setConfirm ] = useState(null)

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
			if (confirm !== password) {
				const elem = document.querySelectorAll("#password");
				elem.forEach((el) => {
					el.style.borderColor = 'rgba(200, 50, 50, 0.6)'
					// TODO: Need to add a proper advise for when the password is wrong D;
				})

				return;
			}

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
		const elm = document.querySelector(".user-image");
		elm.src = prevImg;
	}

	return (
		<main className="user-profile-page">
			<div className="page-container">
				<section className="page-side">
					<h3 style={{textTransform: 'capitalize'}}>{user.user_name}</h3>
					<div className="profile-container">
						<Avatar imgUrl={userProfile} />
						<input className="edit-profile-image" type="file" name="profile" accept="image/*" onChange={previewNewProfile} />
					</div>
					<div className="edit-image">
						<button onClick={handleProfileUpdate}>Edit Profile</button>
					</div>
				</section>
				<section className="user-details">
					<h3>Edit Profile</h3>
					<form className="user-details-form">
						<div>
							<label htmlFor="userName">Username</label>
							<input type="text" defaultValue={user.user_name} onChange={(e) => setUserName(e.target.value)} />
						</div>
						<div>
							<label htmlFor="password">Password</label>
							<input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
						</div>
						<div>
							<label htmlFor="confirm">Confirm Password</label>
							<input type="password" id="password" onChange={(e) => setConfirm(e.target.value)} required />
						</div>

						<button onClick={handleInfoUpdate}>Update Info</button>
					</form>
				</section>
			</div>
		</main>
	)
}
