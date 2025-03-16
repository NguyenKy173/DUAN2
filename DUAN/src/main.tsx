
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import RouterCustom from './router.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <RouterCustom />
    </BrowserRouter>
)
