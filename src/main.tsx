
import { createRoot } from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import './index.css'

// Redirect root to /index to ensure mode selection works
const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
  },
]);

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
