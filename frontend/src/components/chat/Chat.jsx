import Card from './Card.jsx'
import useGetMessages from '../../hooks/useGetMessages'
import Load from "../Load.jsx"
import Error from '../Error.jsx'
import Avatar from '../users/Avatar.jsx'

import "./Chat.css"

import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'

export default function Chat() {
	const API = import.meta.env.VITE_BASE_API

	const navigate = useNavigate()
	const { userId } = useParams() // This would be the user on the other end..
	const [ isLoading, error, messages, recipient ] = useGetMessages(`${API}/chat/${userId}`)
	const [ message, setMessage ] = useState()
	const [ isError, setIsError ] = useState(null)
	let userProfile

	async function handleMessage(e) {
		e.preventDefault();

		try {
			if (!message) {
				return;
			}

			const res = await fetch(`${API}/chat/send/${userId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": localStorage.getItem("jwt-token")
				},
				body: JSON.stringify({message})
			})
			const data = await res.json()

			if (res.status == 401) {
				return navigate("/login");
			}

			if (!data.success) {
				return setIsError(data.error)
			}
			// TODO: Rerendering is such a bad choice here... need to find a way to actually get the messages to load again
			return navigate(0)
		} catch(e) {
			setIsError(e.message)
		} 
	}

	if (isLoading) {
		return (
			<Load type="chat" />
		)
	}

	if (error) {
		return (
			<Error error={error.message} />
		)
	}

	if (recipient.profile_image.length > 0) {
		userProfile = recipient.profile_image[0].image_url
	}

	return (
		<main className="chat-body">
			<div className="chat-header">
				<Avatar imgUrl={userProfile} userName={recipient.user_name} />
			</div>
			<div className="messages">
				{messages.map((msg) => {
					if (msg.sender_id == userId) {
						return (
							<Card key={msg.message_id} message={msg} type="received" />
						)
					}
					return (
						<Card key={msg.message_id} message={msg} type="sent" />
					)
				})}
				<form className="send-message">
					<label htmlFor="messageBody"></label>
					<input type="text" id="messageBody" name="messageBody" placeholder="Message" onChange={(e) => setMessage(e.target.value)} />

					<button onClick={handleMessage}>Send</button>
				</form>
				{ isError && <span>{isError}</span> }
			</div>
		</main>
	)
}
