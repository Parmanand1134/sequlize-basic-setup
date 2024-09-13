const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv');
const connectDatabase = require('./dbConnection'); // Import the connection function

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use(errorHandler);

const startServer = async () => {
    await connectDatabase(); // Connect to the database

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
