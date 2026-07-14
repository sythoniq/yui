import { useState } from 'react'
import { useParams, useLoaderData } from 'react-router'

import Avatar from './Avatar.jsx'

export default function UserPage() {
				const API = import.meta.env.VITE_BASE_API

				const [file, setFile] = useState()
				const user = useLoaderData()

				const profileImage = user.profile_image[0].image_url;
				const { userId } = useParams()
				const token = localStorage.getItem("jwt-token");

				async function handleProfile(e) {
								e.preventDefault()

								const formData = new FormData()
								formData.append('profile', file);

								const res = await fetch(`${API}/user/${userId}`, 
												{
																method: "POST",
																headers: {
																				"Authorization": token || null
																},
																body: formData
												}
								)
								const data = await res.json()

				}

				return (
								<>
												<form encType="multipart/form-data">
																<Avatar imgUrl={profileImage}/>
																<input type="file" name="profile-image" onChange={(e) => setFile(e.target.files[0])}/>

																<button onClick={handleProfile}>Save</button>
												</form>
								</>
				)
}
