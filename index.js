const express = require("express");
const cors = require("cors");
const AWS = require("aws-sdk");
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

// const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
// const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
// const AWS_REGION = process.env.AWS_REGION;
// AWS.config.update({
//   region: AWS_REGION,
//   accessKeyId: AWS_ACCESS_KEY_ID,
//   secretAccessKey: AWS_SECRET_ACCESS_KEY,
// });

app.use('/api', authRoutes);
app.use('/api', workerRoutes);
 
app.listen(port, () => console.log(`Listening on port ${port}`));