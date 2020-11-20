const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const sql_connection = mysql.createConnection({
  host: 'covid.c1obqc4j40zi.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: '1Pass43330!',
  database: 'covid_phase_2'
});

sql_connection.connect(err => {
  if(err) {
    return err;
  }
});

app.get('/',(req,res)=>{
  console.log(req);
  res.json('OK');
});

app.post('/',(req,res)=>{
  res.json(req.body);
});

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
// );
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })



// const exercisesRouter = require('./routes/exercises');
// const usersRouter = require('./routes/users');

// app.use('/exercises', exercisesRouter);
// app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
