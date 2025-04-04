const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Example API route

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
