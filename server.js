// server.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// Serve static files
const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

// POST route for Mad Lib submission
app.post('/ITC505/lab-7/submit', (req, res) => {
  const { year, profession, gadget, emotion, planet } = req.body;

  if (!year || !profession || !gadget || !emotion || !planet) {
    return res.send(`
      <h1>Oops! Missing Info</h1>
      <p>Please fill in all fields before submitting.</p>
      <a href="/ITC505/lab-7/index.html">Back to Form</a>
    `);
  }

  const story = `
    In the year ${year}, a brilliant ${profession} invented a ${gadget} 
    that could open a portal to ${planet}. With ${emotion} flooding their mind, 
    they stepped forward and changed the future forever.
  `;

  res.send(`
    <h1>Your Time Travel Story</h1>
    <p>${story}</p>
    <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
  `);
});

// Dynamic port for Render / Local
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Time Travel Server active on port ${PORT}`));
