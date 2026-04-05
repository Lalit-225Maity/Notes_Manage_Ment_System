const express = require('express');
const app = express();
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser())
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const connectDB = require('./db/db');
connectDB();
const item=require('./Router/router');
app.use('/api',item);
app.listen(port, () => {
    console.log(`server running at ${port}`);

})
