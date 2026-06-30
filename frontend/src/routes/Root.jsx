import App from '../App.jsx'
import Login from '../components/login/Login.jsx'
import Register from '../components/register/Register.jsx'

const routes = [
				{
								path: "/",
								element: <App />
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

export default routes
