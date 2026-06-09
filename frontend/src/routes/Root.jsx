import Fallback from "../components/Fallback.jsx"
import App from '../App.jsx'
import ChatPage from '../components/ChatPage.jsx';


const BASE_API = import.meta.env.VITE_BASE_API_URL;

async function getAllUsers() {
  try {
    const res = await fetch(BASE_API+"/users");
    const data = await res.json()

    if (data.success == false) {
      throw new Error("Error fetching users!")
    }

    return data.users;
  } catch (e) {
    return e;
  }
}

const routes = [
  {
    path: "/",
    element: <App />,
    loader: getAllUsers,
    hydrateFallbackElement: <Fallback />,
    children: [
    ]
  }
]

export default routes;
