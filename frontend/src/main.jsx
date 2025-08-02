import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import './index.css'
import App from './App.jsx'
const stripePromise = loadStripe("pk_test_51RrKxv7F5qSEKIHYFRPOxS7Fwi2aT0EqstUBYbRbdriVQsUnF323N0RF7CaY1U0iI266zOHoBGQBiCQHh2IPDtp700qeKoNZpK");
createRoot(document.getElementById('root')).render(
  <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>
)
