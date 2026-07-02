import App from '../App.jsx'
import Login from '../components/login/Login.jsx'
import Register from '../components/register/Register.jsx'
import Chat from '../components/chat/Chat.jsx'
import UserPage from '../components/users/UserPage.jsx'

const API = import.meta.env.VITE_BASE_API

async function getMessages({params}) {
				const res = await fetch(`${API}/chat/${params.userId}`, {
								headers: {
												"Content-Type": "application/json",
												"Authorization": localStorage.getItem("jwt-token")
								}
				});
				const data = await res.json()
				if (!data.success) {
								console.error("Error fetching messages")
				}

				const messages = data.messages;

				return messages;
}


const routes = [
				{
								path: "/",
								element: <App />,
								children: [
												{
																path: "/chat/:userId",
																element: <Chat />,
																loader: getMessages
												}
								]
				},
				{
								path: "/login",
								element: <Login />
				},
				{
								path: "/register",
								element: <Register />
				},
				{
								path: "/profile/:userId",
								element: <UserPage />
				}
]

export default routes
