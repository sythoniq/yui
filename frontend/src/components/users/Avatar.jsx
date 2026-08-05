import ProfileSvg from '../../public/default.svg'

export default function Avatar({imgUrl, userName}) {
	return (
		<div className="user-avatar">
			<div className="avatar-image">
				{imgUrl ? <img className="user-image" src={imgUrl} alt="User profile img" width="10%"/>
					: <img className="user-image" src={ProfileSvg} alt="Default profile img" width="10%"/>
				}
			</div>
			<span>{userName}</span>
		</div>
	)
}
