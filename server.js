const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// routes import
const userRoutes = require('./routes/users');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB Connection
const db = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🚀 Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed', error);
  }
};
db();

// Routes
app.use('/api', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message,
  });
});


const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`🌎 Server is running at http://localhost:${PORT} 🚀`);
});
