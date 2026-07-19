import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function useGetMessages(url) {
	const [ isLoading, setIsLoading ] = useState(true)
	const [ messages, setMessages ] = useState(null)
	const [ error, setError ] = useState(undefined)
	const [ recipient, setRecipient ] = useState(null)

	const navigate = useNavigate()

	useEffect(() => {
		let active = true;

		async function fetchMessages() {
			const res = await fetch(url, {
				headers: {
					"Authorization": localStorage.getItem("jwt-token")
				}
			});
			const data = await res.json()

			if (res.status == 401) {
				return navigate("/login")
			}

			if (!data) {
				setError("Timeout error")
				setIsLoading(false)
				return;
			}
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
