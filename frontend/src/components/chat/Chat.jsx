import Card from './Card.jsx'

import "./Chat.css"

import { useState } from 'react'
import { useLoaderData, useParams, useNavigate } from 'react-router'

export default function Chat() {
				const API = import.meta.env.VITE_BASE_API

				const navigate = useNavigate()
				const { messages, recipient } = useLoaderData()
				const { userId } = useParams() // This would be the user on the other end..
				const [ message, setMessage ] = useState()

				async function handleMessage(e) {
								e.preventDefault()

								const token = localStorage.getItem("jwt-token");

								if(!token) {
												//TODO: Handle the case where there is no token...
												return;
								}

								const res = await fetch(`${API}/chat/send/${userId}`, {
												method: "POST",
												headers: {
																"Content-Type": "application/json",
																"Authorization": token
												},
												body: JSON.stringify({message})
								})

								const data = await res.json()
								if (!data.success) {
												//TODO: Handle this error so that the user can know there was an error sending the message...
												return;
								}
								navigate(0);
				}

				if (messages == undefined) {
								return (
												<p>Loading...</p>
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
