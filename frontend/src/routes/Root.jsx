import App from '../App.jsx'
import ChatPage from '../components/ChatPage.jsx';

const routes = [
  {
    path: "/chat/:userId",
    element: <ChatPage />
  },
  {
    path: "/",
    index: true, element: <App />
  }
]
