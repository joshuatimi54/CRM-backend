const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');
const uri = process.env.MONGOO_URI
// add the admin routes here
const adminRouter = require('././Admin/routes/adminRoute');

// Thats package to integrate our frontend and backend
const cors = require('cors');

// add the error middlewares route
const { notFound, errorHandler } = require('./Admin/middleware/errorMdl');

env.config();
app.use(express.json());
app.use(cors());
app.use('/api/admin', adminRouter);

// connect our databse here
const connectDB = async () => {
    mongoose.connect(`mongodb+srv://${process.env.ADMIN_USER}:${process.env.ADMIN_PASSWORD}@cluster0.1mcfclo.mongodb.net/${process.env.ADMIN_DATABASE}`, {
    })
      .then(() => {
        console.log("Successfully connected to MongoDB")
  
      }).catch((error) => {
        console.error("Unable to connect to MongoDB", error);
      })
  }

// add error hander middlewares here
app.use(notFound);
app.use(errorHandler)



connectDB().then(() => {

    app.listen(process.env.PORT, () => {
        console.log(`Server Runing On PORT ${process.env.PORT}`)
    })
  })