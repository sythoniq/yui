import Card from './Card.jsx'
import useGetMessages from '../../hooks/useGetMessages'

import "./Chat.css"

import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'

export default function Chat() {
	const API = import.meta.env.VITE_BASE_API

	const navigate = useNavigate()
	const { userId } = useParams() // This would be the user on the other end..
	const [ isLoading, error, messages, recipient ] = useGetMessages(`${API}/chat/${userId}`)
	const [ message, setMessage ] = useState()

	async function handleMessage(e) {
		e.preventDefault();

		try {
			const res = await fetch(`${API}/chat/send/${userId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": localStorage.getItem("jwt-token")
				},
				body: JSON.stringify({message})
			})
			const data = await res.json()

			if (!data.success) {
				throw new Error(data.error)
			}
			// TODO: Instead of reloading the page might wanna fetch messages again... makesi t easier to render the messages i believe, or add a timer to the message fetching so that every once in a while messages are fetched
			navigate(0)				
		} catch(e) {
			console.error(e);
		} 
	}

	if (isLoading) {
		//TODO: Handle chat page loading
		return (
			<p>Loading... </p>
		)
	}

	if (error) {
		// TODO: Handle error state of the page
		return (
			<p>Error: {error.message}</p>
		)
	}

	return (
		<main className="chat-body">
			<div className="chat-header">
				<h2>{recipient.user_name}</h2>
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
			</div>
			<form className="send-message">
				<label htmlFor="messageBody"></label>
				<input type="text" id="messageBody" name="messageBody" placeholder="Message" onChange={(e) => setMessage(e.target.value)} />

				<button onClick={handleMessage}>Send</button>
			</form>
		</main>
	)
}
