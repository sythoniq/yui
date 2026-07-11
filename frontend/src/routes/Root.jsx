import App from '../App.jsx'
import Login from '../components/login/Login.jsx'
import Register from '../components/register/Register.jsx'
import Chat from '../components/chat/Chat.jsx'
import UserPage from '../components/users/UserPage.jsx'

const API = import.meta.env.VITE_BASE_API
const token = localStorage.getItem("jwt-token") || null;

async function getMessages({params}) {
				const res = await fetch(`${API}/chat/${params.userId}`, {
								headers: {
												"Content-Type": "application/json",
												"Authorization": token
								}
				});
				const data = await res.json()
				if (!data.success) {
								console.error("Error fetching messages")
				}

				const messages = data.messages;
				const recipient = data.recipient;

				return { messages, recipient }
}

async function getUserProfile({params}) {
				const res = await fetch(`${API}/user/${params.userId}`, {
								headers: {
												"Authorization": token
								}
				})
				const data = await res.json()

				if (!data.success) {
								return data;
				}

				return data.user
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
								element: <UserPage />,
								loader: getUserProfile
				}
]

export default routes
