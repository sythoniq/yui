import { Link } from 'react-router'
import { useState, useEffect } from 'react' 

import Load from '../Load.jsx'
import Error from '../Error.jsx'
import "./Users.css"
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
		<div key={user.user_id} className="user-card">
			<Link to={`/chat/${user.user_id}`}>
				<h2>{user.user_name}</h2>
			</Link>
		</div>	
	)
	return (
		<main className="users-list">
			{listUsers}
		</main>
	)
}
