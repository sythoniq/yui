import "./Chat.css"

import { useState, useEffect } from 'react'
import { useParams, useLoaderData } from 'react-router'

export default function Chat() {
				const { userId } = useParams()
				const messages = useLoaderData()

				if (messages == undefined) {
								return (
												<p>Loading...</p>
								)
				}

				return (
								<main className="chat-body">

								</main>
				)
}
