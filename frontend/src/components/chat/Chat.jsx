import Card from './Card.jsx'

import "./Chat.css"

import { useLoaderData } from 'react-router'

export default function Chat() {
				const messages = useLoaderData()

				if (messages == undefined) {
								return (
												<p>Loading...</p>
								)
				}


				return (
								<main className="chat-body">
												{messages.map((msg) => {
																return (
																				<Card message={msg} key={msg.message_id} />
																)
												})}
								</main>
				)
}
