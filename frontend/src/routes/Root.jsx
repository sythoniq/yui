import App from "../App.jsx"
import Login from "../components/Login.jsx"; import Register from "../components/Register.jsx"; import ChatPage from '../components/ChatPage.jsx'

const API = import.meta.env.VITE_BASE_API

async function getAllUsers() {
				try {
								const res = await fetch(API+'/user');
								const data = await res.json();

								if (!data.success) {
												throw new Error("Failed to acquire users!")
								}

								return data.users;
				} catch(e) {
							console.error(e);	
				}
}

async function loadChat({params}) {
				const userId = params.userId;

				try {
								
				} catch(e) {
								console.error(e);
				}
}

const routes = [
				{
								path: "/",
								element: <App />,
								loader: getAllUsers,
								children: [
												{
																path: "/user/:userId/profile",
												},
												{
																path: "/chat/:userId",
																loader: loadChat,
																element: <ChatPage />
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

				}
]

export default routes;

