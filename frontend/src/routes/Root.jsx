import App from '../App.jsx'
import Login from '../components/login/Login.jsx'
import Register from '../components/register/Register.jsx'
import Chat from '../components/chat/Chat.jsx'
import UserPage from '../components/users/UserPage.jsx'

const routes = [
				{
								path: "/",
								element: <App />,
								children: [
												{
																path: "/chat/:userId",
																element: <Chat />
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
