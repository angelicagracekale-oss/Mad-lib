// server.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// Serve static files from "public"
const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

// POST route for the time travel mad lib
app.post('/ITC505/lab-7/submit', (req, res) => {
  const { year, profession, gadget, emotion, planet } = req.body;

  // Simple form validation
  if (!year || !profession || !gadget || !emotion || !planet) {
    return res.send(`
      <h1>Oops! Missing Info</h1>
      <p>Please fill in all fields before submitting.</p>
      <a href="/ITC505/lab-7/index.html">Back to Form</a>
    `);
  }

  const story = `
    In the year ${year}, a daring ${profession} activated a ${gadget} 
    that accidentally opened a wormhole to ${planet}! With ${emotion} 
    rushing through their veins, they stepped through and changed history forever.
  `;

  res.send(`
    <h1>Your Time Travel Story</h1>
    <p>${story}</p>
    <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
  `);
});

// Port setup for local & Render
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🕓 Time Portal active on port ${PORT}`));
