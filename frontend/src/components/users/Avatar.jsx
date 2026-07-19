import ProfileSvg from '../../public/default.svg'

export default function Avatar({imgUrl, userName}) {
	return (
		<div className="user-avatar">
			<div className="avatar-image">
				{imgUrl ? <img src={imgUrl} alt="User profile img" width="10%"/>
					: <img src={ProfileSvg} alt="Default profile img" width="10%"/>
				}
			</div>
			<span>{userName}</span>
		</div>
	)
}
