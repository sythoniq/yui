import Card from './Card.jsx'

import "./Chat.css"

import { useLoaderData, useParams } from 'react-router'

export default function Chat() {
				const messages = useLoaderData()
				const { userId } = useParams() // This would be the user on the other end..

				if (messages == undefined) {
								return (
												<p>Loading...</p>
								)
				}


				return (
								<main className="chat-body">
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
								</main>
				)
}
