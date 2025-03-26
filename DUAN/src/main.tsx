
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import RouterCustom from './router.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes,Route } from 'react-router-dom';
import AdminRouter from './adminRouter.tsx';
import { HelmetProvider } from "react-helmet-async"; 
import { CartProvider } from './contact/cartContact.tsx'; // Import CartProvider
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <HelmetProvider>
        <CartProvider> 
        <BrowserRouter>
        <Routes>
                {/* Route của user */}
                <Route path="/*" element={<RouterCustom />} />

                {/* Route của admin */}
                <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
        </BrowserRouter>
        </CartProvider> 
        </HelmetProvider>
    </QueryClientProvider>
)
