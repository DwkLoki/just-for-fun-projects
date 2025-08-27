import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'
import Root from './routes/Root.tsx'
import Home from './routes/Home'
import ProjectDetail from './routes/ProjectDetail'
import './index.css'

// Buat struktur routing
const router = createBrowserRouter([
    {
        path: '/',             // ini adalah root path
        element: <Root />,     // layout utama
        children: [
            {
                index: true,       // halaman default (== path: '')
                element: <Home />
            },
            {
                path: 'project/:slug', // halaman detail project, param dinamis
                element: <ProjectDetail />
            }
        ]
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
