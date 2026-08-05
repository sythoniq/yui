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
		e.preventDefault()
	}

	async function handleProfileUpdate(e) {

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
			<section className="page-side">
				<h3>{user.user_name}</h3>
				<div className="profile-container">
					<Avatar imgUrl={userProfile} />
					<input className="edit-profile-image" type="file" name="profile" accept="image/*" onChange={previewNewProfile} />
				</div>
				<div className="edit-image">
					<button onClick={handleProfileUpdate}>Edit Profile</button>
				</div>
			</section>
			<section className="user-details">
				<form className="user-details-form">
					<label htmlFor="userName"> Username
						<input type="text" defaultValue={user.user_name} />
					</label>
					<label htmlFor="password"> Password
						<input type="password" />
					</label>

					<button onClick={handleInfoUpdate}>Update Info</button>
				</form>
			</section>
		</main>
	)
}
