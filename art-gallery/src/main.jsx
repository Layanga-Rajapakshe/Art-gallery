import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

createRoot(document.getElementById('root')).render(
  <PayPalScriptProvider options={{ clientId: "AbyMqRwYxjVait2U8bFQldXg73M2UKs7-uu57N-Os4H2ydt7Y11hpanwB8EeOMFHVK40-jgG2b6N0tJ1" }}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </PayPalScriptProvider>
)
