export default function Card({message, type}) {

				return (
								<div className={`message-card ${type}`}>
												<div className="message-body">
																<p>{message.message_content}</p>
												</div>
												<div className="message-details">
																<p>{new Date(message.message_date).toLocaleTimeString(
																				[], { hour: "2-digit", minute: "2-digit"}
																)}</p>
												</div>
								</div>
				)
}
