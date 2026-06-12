import { StrictMode } from 'react'; import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import rootRoutes from "./routes/Root.jsx"

const routes = createBrowserRouter(rootRoutes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
