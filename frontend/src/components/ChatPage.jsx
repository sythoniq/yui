import { useState } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router';

export default function ChatPage() {
				const API = import.meta.env.VITE_BASE_API
				const navigate = useNavigate()
				const messages = useLoaderData()

				const receiverId = useParams().userId;
				const [message, setMessage] = useState()

				async function handleMessage(e) {
								e.preventDefault()

								try {
												const res = await fetch(API + `/chat/${receiverId}/send`, {
																method: "POST",
																headers: {
																				"Content-Type": "application/json",
																				"Authorization": localStorage.getItem("jwt-token")
																},
																body: JSON.stringify({messageBody: message})
												})
												const data = await res.json()

												if (data.success) {
																navigate(0)
												}
												throw new Error("Error sending message...")
								} catch(e) {
												console.error(e);
								}
				}

				return (
								<main className="chat-page">
												<div className="chat-page-body">
												</div>
												<form className="chat-space">
																<label htmlFor="messageContent"></label>
																<input type="text" id="messageContent" name="messageContent" onChange={(e) => setMessage(e.target.value)}/>
																<button onClick={handleMessage}>Send</button>
												</form>
								</main>
				)
}
