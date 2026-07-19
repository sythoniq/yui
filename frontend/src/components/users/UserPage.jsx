import { useState } from 'react'
import { useParams, useLoaderData } from 'react-router'

import Load from '../Load.jsx'
import Error from "../Error.jsx"
import Avatar from './Avatar.jsx'
import useGetUser from '../../hooks/useGetUser.js'

export default function UserPage() {
	const API = import.meta.env.VITE_BASE_API
	const { userId } = useParams()
	const [ user, loading, error ] = useGetUser(`${API}/user/${userId}`)
	let userProfile;

	// TODO: Render the page for the user editing and render their profile image if they have one otherwiser render a default image.. then have a form for updating the user details as well as handling the updating of the user profile... when handling the user profile update ensure that I do check that a file is passed if not terminate the process and silently ignore the request...

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

	if (user.profile_image.length > 0) {
		userProfile = user.profile_image[0].image_url
	}

	return (
		<main className="user-profile-page">
			<section className="user-details">
				<form className="user-details-form">
					<label htmlFor="userName">
						<input type="text" defaultValue={user.user_name} />
					</label>
				</form>
			</section>
			<section className="user-profile">
				<form className="user-profile-form">
					<div className="profile-upload">
						<Avatar imgUrl={userProfile} />
					</div>
				</form>
			</section>
		</main>
	)
}
