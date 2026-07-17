import { useState, useEffect } from 'react'

export default function useGetMessages(url) {
	const [ isLoading, setIsLoading ] = useState(true)
	const [ messages, setMessages ] = useState()
	const [ error, setError ] = useState(undefined)
	const [ recipient, setRecipient ] = useState()

	useEffect(() => {
		let active = true;

		async function fetchMessages() {
			const res = await fetch(url, {
				headers: {
					"Authorization": localStorage.getItem("jwt-token")
				}
			});
			const data = await res.json()

			// ERROR: Need to figure out how to get the error status so that I can work with that..
			if (active) {
				if (!data.success) {
					setError(data)
					setIsLoading(false)
					setMessages(null)
					setRecipient(null)
					return;
				}
				setMessages(data.messages)
				setRecipient(data.recipient)
				setIsLoading(false)
				setError(undefined)
				return;
			}
		}

		fetchMessages()

		return () => {
			active = false
		}
	}, [url])
	return [isLoading, error, messages, recipient]
}
