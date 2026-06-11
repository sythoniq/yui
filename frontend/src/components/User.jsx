import { Link } from 'react-router'

export default function User(props) {
  return (
    <Link to={`/user/${props.userId}`}>
      <div className="user-card">
        <img src="#" alt="generic user profile img" />
        <p>{props.userName}</p>
      </div>
    </Link>
  )
}
