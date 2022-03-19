/**
 * Dependency Imports
 */
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

/**
 * Instantiating app
 */
const app = express();

/**
 * File Imports
 */
const userRouter = require('./src/routes/user');

const PORT = process.env.PORT || 5000;

/**
 * Configuring app
 */
app.use(express.json());
dotenv.config();
app.use(cors());

/**
 * Setting Routes
 */
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));
app.use('/user/', userRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
