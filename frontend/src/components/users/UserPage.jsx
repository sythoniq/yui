import { useState } from 'react'
import { useParams, useLoaderData } from 'react-router'

import Avatar from './Avatar.jsx'

export default function UserPage() {
	const API = import.meta.env.VITE_BASE_API
	
	// TODO: Render the page for the user editing and render their profile image if they have one otherwiser render a default image.. then have a form for updating the user details as well as handling the updating of the user profile... when handling the user profile update ensure that I do check that a file is passed if not terminate the process and silently ignore the request...

	return (
		<p>Hi</p>
	)
}
