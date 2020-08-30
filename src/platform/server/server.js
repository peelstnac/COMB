if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
// Import routes
const auth = require('./routes/auth');

// Set up routes
app.use('/auth', auth);

// Listen on PORT
app.listen(process.env.PORT, () => {
    console.log(`server.js: listening on PORT ${process.env.PORT}`);
});