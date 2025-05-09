import React, { useCallback } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const fetchClientSecret = useCallback(() => {
    return fetch('http://localhost:5001/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: 'price_1RMDjFQOCKCphDvbla77q6jC' }) // Replace with your actual Price ID
    })
      .then(res => res.json())
      .then(data => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout" style={{ maxWidth: 500, margin: 'auto', paddingTop: 40 }}>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
      <h1>
        Test
      </h1>
    </div>

  );
};


export default Checkout;
