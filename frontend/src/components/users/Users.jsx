import { Link } from 'react-router'
import { useState, useEffect } from 'react' 
import styles from './users.module.css'

import Avatar from './Avatar.jsx'
import Load from '../Load.jsx'
import Error from '../Error.jsx'
import useGetUsers from '../../hooks/useGetUsers.js'

export default function Users() {
	const API = import.meta.env.VITE_BASE_API
	const [ users, loading, error] = useGetUsers(`${API}/`)

	if (loading) {
		return (
			<Load type="users" />
		)
	}

	if (error) {
		return (
			<Error error={error} />
		)
	}

	const listUsers = users.map(user => 	
		<div key={user.user_id} className={styles.card}>
			<Link to={`/chat/${user.user_id}`}>
				<div className={styles.userDetail}>
					{user.profile_image.length > 0 && (
						<Avatar imgUrl={user.profile_image[0].image_url} />
					)}
					<h2 class={styles.textStyle}>{user.user_name}</h2>
				</div>
			</Link>
		</div>	
	)
	return (
		<main className={styles.users}>
			<h2 style={{color: "rgba(0, 0, 0, 0.69)", textDecoration: "underline", alignSelf: "center"}}>Users List</h2>
			{listUsers}
		</main>
	)
}
