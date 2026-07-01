import "./Chat.css"

import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

export default function Chat() {
				const API = import.meta.env.VITE_BASE_API
				const { userId } = useParams()

				const [receivedMessages, setReceivedMessages] = useState()
				const [sentMessages, setSentMessages] = useState()

				useEffect(() => {
								async function getMessages() {
												const res = await fetch(`${API}/chat/${userId}`, {
																headers: {
																				"Content-Type": "application/json",
																				"Authorization": localStorage.getItem("jwt-token")
																}
												});
												const data = await res.json()
												if (!data.success) {
																console.error("Error fetching messages")
												}

												const messages = data.messages;
												setSentMessages(messages.sentMessages)
												setReceivedMessages(messages.receivedMessages);
								}

								return () => {
												getMessages()
								}
				}, [])

				return (
								<main className="chat-body">
								</main>
				)
}
