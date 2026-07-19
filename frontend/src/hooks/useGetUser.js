import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router' 

export default function useGetUser(url) {
	const [ user, setUser ] = useState(null)
	const [ isLoading, setIsLoading ] = useState(true)
	const [ isError, setIsError ] = useState(null) 

	const navigate = useNavigate()

	const token = localStorage.getItem("jwt-token")

	useEffect(() => {
		let active = true;
		async function getUser() {
			try {
				const res = await fetch(url, {
					headers: {
						"Authorization": token
					}
				})

				if (res.status == 401) {
					return navigate("/login")
				}

				if (res.status == 404) {
					return navigate("/")
				}

				const data = await res.json()

				if (active) {
					if (!data.success) {
						setError(data.error.message)
						setIsLoading(false)
						return;
					}

					setUser(data.user)
					setIsLoading(false)
				}
			} catch(e) {
				setError(e.message)
				setIsLoading(false)
			}
		}
		getUser()

		return () => {
			active = false
		}
	}, [token])
	return [ user, isLoading, isError ];	
}
