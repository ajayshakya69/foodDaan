const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./lib/db');

require('dotenv').config()


const PORT = process.env.PORT || 5000;

// external routes
const router = require("./routes")
const { globalErrorHandler } = require('./middleware/errorHandler');

const app = express();
connectDB();


app.use(cors())
  .use(express.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(router)
  .use(globalErrorHandler)












app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
