import { useState } from 'react'
import { useParams, useLoaderData } from 'react-router'

import Load from '../Load.jsx'
import Error from "../Error.jsx"
import Avatar from './Avatar.jsx'
import useGetUser from '../../hooks/useGetUser.js'

export default function UserPage() {
	const API = import.meta.env.VITE_BASE_API
	const { userId } = useParams()
	const [ user, loading, error, userProfile ] = useGetUser(`${API}/user/${userId}`)

	// TODO: Render the page for the user editing and render their profile image if they have one otherwise render a default image.. then have a form for updating the user details as well as handling the updating of the user profile... when handling the user profile update ensure that I do check that a file is passed if not terminate the process and silently ignore the request... but what about if the request is ummm not a profile change only?... rac

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

	return (
		<main className="user-profile-page">
			<Avatar imgUrl={userProfile} />
			<section className="user-profile">
				<form className="user-profile-form">
					<div className="profile-upload">
					</div>
				</form>
			</section>
			<section className="user-details">
				<form className="user-details-form">
					<label htmlFor="userName">
						<input type="text" defaultValue={user.user_name} />
					</label>
				</form>
			</section>
		</main>
	)
}
