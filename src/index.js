import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CounterContexProvider } from './CounterContext';
import { UserContextProvider } from './UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';



const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 3000
    }
  }
})
root.render(
  <CounterContexProvider>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>

      <Toaster ></Toaster>
        <App />
        {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right'></ReactQueryDevtools> */}
      </QueryClientProvider>
    </UserContextProvider>
  </CounterContexProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
