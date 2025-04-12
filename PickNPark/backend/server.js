require('dotenv').config();
const express = require('express');
const connectDB = require('./db/db');
const authRoutes = require('./routes/authRoutes');
const parkingRoutes = require('./routes/parkingRoutes');
const app = express();
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PORT = process.env.PORT || 5000;
const YOUR_DOMAIN = process.env.DOMAIN || 'http://localhost:5000';

app.use(cors());
connectDB();
app.use(express.json());
app.use(express.static('public')); // Needed if you're serving static Stripe content

// Route to display the initial message on browser
app.get('/', (req, res) => {
  res.send('PICKNPARK BACKEND API');
});

// Auth routes
app.use('/api/auth', authRoutes);
app.use('/api/parking', parkingRoutes);


// Stripe Checkout route
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: req.body.priceId, // make sure client sends this
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `http://localhost:8080`,
    });

    res.send({ clientSecret: session.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).send('Stripe session creation failed');
  }
});

// Stripe session status check route
app.get('/session-status', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.send({
      status: session.status,
      customer_email: session.customer_details?.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to retrieve session status');
  }
});

app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT} 🚀`);
});
