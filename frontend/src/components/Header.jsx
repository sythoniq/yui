import { Link } from 'react-router'
import { useState } from 'react'

export default function Header(props) {
				const [searchData, setSearchData] = useState('')

				return (
								<header className="page-heading">
												<Link to="/"><h2>結Yui</h2></Link>
												<nav className="heading-nav">
																{/* Have a search button here to search for a user */}
																<input type="text" placeholder="Search" onChange={(e) => setSearchData(e.target.value)}/>
																<Link to="/about">About</Link>
																<Link to="/profile">UserProf</Link>
												</nav>
								</header>
				)
}
