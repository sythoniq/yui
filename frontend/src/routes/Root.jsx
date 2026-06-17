import App from "../App.jsx"
import Login from "../components/Login.jsx"; import Register from "../components/Register.jsx"; import ChatPage from '../components/ChatPage.jsx'; import UserProfile from "../components/UserProfile.jsx";

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
								const res = await fetch(API + `/chat/${userId}`, {
												headers: {
																"Content-Type": "application/json",
																"Authorization": localStorage.getItem("jwt-token")
												}
								});
								const data = await res.json()

								if (!data.success) {
												throw new Error("Error while fetching chat")
								}

								console.log(data.messages);
								return data.messages;
				} catch(e) {
								console.error(e);
				}
}

function Loading() {
				return (
								<h2>Loading...</h2>
				)
}

const routes = [
				{
								path: "/",
								element: <App />,
								loader: getAllUsers,
								hydrateFallbackElement: <Loading />,
								children: [
												{
																path: "/user/:userId/profile",
																element: <UserProfile />
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

