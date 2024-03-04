const express = require('express');
const app = express();
const env = require('dotenv');

env.config();
app.use(express.json());


app.listen(process.env.PORT, () => {
    console.log(`Server Runing On PORT ${process.env.PORT}`)
})