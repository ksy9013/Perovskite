const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mysql = require('mysql');

require('dotenv').config();

const app = express();

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

app.post('/covid_by_state',(req,res)=>{
  console.log(req.body.State_Ab);
  sql_connection.query(`SELECT * FROM COVIDDATA WHERE State_Ab = \"${req.body.State_Ab}\"`, (err, result)=> {
    if (err) {
      return res.send(err)
    }
    else {
      res.json({
        data: result
      })
    }
  })
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

app.listen(5000, () => {
    console.log(`Server is running on port: 5000`);
});
