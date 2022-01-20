const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
require("./utils/passport");
const authRoutes = require("./routes/authRoutes");
const workerRoutes = require("./routes/workerRoutes");

const app = express()
const port = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

app.use(cors());

app.use('/api', authRoutes);
app.use('/api', workerRoutes);
 
app.listen(port, () => console.log(`Listening on port ${port}`));