import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router';

export default function ChatPage() {
				const API = import.meta.env.VITE_BASE_API
				const messages = useLoaderData()

				const receiverId = useParams().userId;
				const [message, setMessage] = useState()

				const sent = messages.sent;
				const received = messages.received;

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

												console.log(data);
								} catch(e) {
												console.error(e);
								}
				}

				return (
								<main className="chat-page">
												<div className="chat-page-body">
																{sent.map((msg) => {
																				return (
																								<div className="sent-messages" key={msg.messageId}>
																												<p>{msg.messageContent}</p>
																												<p>Sent</p>
																								</div>
																				)
																})}
																{received.map((msg) => {
																				return (
																								<div className="received-messages" key={msg.messageId}>
																												<p>{msg.messageContent}</p>
																												<p>Received</p>
																								</div>
																				)
																})}
												</div>
												<form className="chat-space">
																<label htmlFor="messageContent"></label>
																<input type="text" id="messageContent" name="messageContent" onChange={(e) => setMessage(e.target.value)}/>
																<button onClick={handleMessage}>Send</button>
												</form>
								</main>
				)
}
