import { useState, useEffect } from 'react'

export default function useGetUsers(url) {
	const [ users, setUsers ] = useState()	
	const [ isLoading, setIsLoading ] = useState(true)
	const [ error, setError ] = useState() 

	useEffect(() => {
		let active = true

		async function fetchUsers() {
			try {
				const res = await fetch(url, {
					headers: {
						"Content-Type": 'application/json',
						"Authorization": localStorage.getItem("jwt-token")
					}
				})
				const data = await res.json()

				if (!res.ok) {
					setError("Network error")
					setUsers(null)
					setIsLoading(false)
					return;
				}
				if (active) {
					if (!data.success) {
						console.log(data);
						setError(data.error)
						setUsers(null)
						setIsLoading(false)
						return;
					}

					setUsers(data.users)
					setIsLoading(false)
					setError(undefined)
				}
			} catch(e) {
				setError(e.message)
				setIsLoading(false)
			}
		}

		fetchUsers()

		return () => {
			active = false;
		}
	}, [url])

	return [ users, isLoading, error]
}
