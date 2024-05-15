const express = require('express');
const mongoose = require('mongoose');
const transactionRoutes = require('./routes/transaction');
// Other imports

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fare', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

// Register transaction routes
app.use('/api/transactions', transactionRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {``
    console.log(`Server is running on port ${PORT}`);
});

