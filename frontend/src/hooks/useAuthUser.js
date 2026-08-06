import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export default function useAuthUser(url, token) {
	const [ isLoading, setIsLoading ] = useState(true)
	const [ isError, setIsError ] = useState(null)
	const [ loggedIn, setLoggedIn ] = useState(false)
	const [ user, setUser ] = useState(null);
	const [ userProfile, setUserProfile ] = useState(null);

	const navigate = useNavigate()

	useEffect(() => {
		let active = true;
		async function auth() {
			if (!token) {
				setIsLoading(false)
				navigate("/login")
				return;
			}
			
			const res = await fetch(url, {
				headers: {
					"Authorization": token
				}
			});

			const data = await res.json()
			if (!data.success) {
				setIsError(data.message)
				setIsLoading(false)
				return;
			}

			setIsLoading(false)
			setLoggedIn(true)
			setUser(data.user)
			if (data.user.profile_image.length > 0) {
				setUserProfile(data.user.profile_image[0].image_url)
			}
		}

		auth()
		
		return () => {
			active = false
		}
	}, [url])

	return [loggedIn, isLoading, isError, user, userProfile];
}
