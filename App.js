const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./configs/dbconfig');




const AuthRoute = require('./routes/AuthRoutes')
// Load environment variables from .env file
dotenv.config();

const app = express();
connectDB(); // Connect to MongoDB

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api',AuthRoute)



// Sample route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
