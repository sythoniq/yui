import Card from './Card.jsx'
import useGetMessages from '../../hooks/useGetMessages'
import Load from "../Load.jsx"
import Error from '../Error.jsx'

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
					"Authorization": null
				},
				body: JSON.stringify({message})
			})
			const data = await res.json()

			if (!data.success) {
				throw new Error(data.error)
			}
			// TODO: Rerendering is such a bad choice here... need to find a way to actually get the messages to load again
			navigate(0)
		} catch(e) {
			console.error(e);
		} 
	}

	if (isLoading) {
		return (
			<Load type="chat" />
		)
	}

	if (error) {
		return (
			<Error error={error} />
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
				<form className="send-message">
					<label htmlFor="messageBody"></label>
					<input type="text" id="messageBody" name="messageBody" placeholder="Message" onChange={(e) => setMessage(e.target.value)} />

					<button onClick={handleMessage}>Send</button>
				</form>
			</div>
		</main>
	)
}
