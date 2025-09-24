const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
// Import other routes...

const app = express();
connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
// Use other routes...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// ... (existing code)
const ratingsRoutes = require('./routes/ratings');

// ... (existing app setup)
app.use('/api/ratings', ratingsRoutes);

// ... (existing listener)
