import React from 'react';
import ReactDOM from 'react-dom/client';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import UserContextProvider from './Hooks/UserContext';
import { Toaster } from 'react-hot-toast';


const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <UserContextProvider>
       <QueryClientProvider client={queryClient}>
        <Toaster></Toaster>
       <App />
    </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);



