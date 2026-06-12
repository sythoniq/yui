import { Link, useNavigate } from 'react-router'

{/* TODO: Uhh i need to pass userId to profile or rather figure out how to load a user profile... yikes */}
export default function Header({loggedIn}) {
				const navigate = useNavigate()
				function logout() {
								localStorage.removeItem("jwt-token");
								navigate("/")
				}
				return (
				<header className="page-heading">
								<h2>Yui</h2>
								<nav className="page-nav">
												<Link to="/about">About</Link>
												{loggedIn ? (
																<button onClick={logout}>Logout</button>
												) : (
																<Link to="/login">Login</Link>
												)}
								</nav>
				</header>
				)
}
