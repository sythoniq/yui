import { Link } from 'react-router';

export default function UserCard(props) {
				return (
								<Link to={`/chat/${props.userId}`}>
												<div className="user-card">
																{ /* Have an image element here for the profile */}
																<h3>{props.userName}</h3>
												</div>
								</Link>
				)
}
