import styles from './header.module.css'
import { Link } from 'react-router'
import useAuthUser from '../../hooks/useAuthUser.js'
import Avatar from '../users/Avatar.jsx'
import Load from '../Load.jsx'
import Error from '../Error.jsx'

export default function Header() {
	const API = import.meta.env.VITE_BASE_API
	const token = localStorage.getItem("jwt-token")

	const [ loggedIn, isLoading, isError, user, userProfile ] = useAuthUser(`${API}/auth`, token)

	if (isLoading) {
		return (
			<Load type={"User"} />
		)
	}

	if (isError) {
		return (
			<Error error={isError} />
		)
	}

	return (
		<header className={styles.heading}>
			<Link to="/"><h2>Yui</h2></Link>
			<nav className={styles.nav}>
				{loggedIn ? (
					<Link className={styles.image} to={`/profile/${user.user_id}`}>
						<Avatar imgUrl={userProfile} userName={user.user_name} />
					</Link>
				) : (
						<Link to="/login"><h4>Login</h4></Link>
					)}
			</nav>
		</header>
	)
}
