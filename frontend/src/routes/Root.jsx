import App from '../App.jsx'
import Login from '../components/login/Login.jsx'
import Register from '../components/register/Register.jsx'
import Chat from '../components/chat/Chat.jsx'
import UserPage from '../components/users/UserPage.jsx'

const API = import.meta.env.VITE_BASE_API
const token = localStorage.getItem("jwt-token") || null;

// ERROR: Absolutely redudant atm.. need to fix supabase stuff with ownership as well
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
]

export default routes
