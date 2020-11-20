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
  if (err) {
    return err;
  }
});

app.post('/covid_by_state', (req, res) => {
  sql_connection.query(`SELECT * FROM COVIDDATA WHERE State_Ab = \"${req.body.State_Ab}\"`, (err, result) => {
    if (err) {
      return res.send(err)
    }
    else {
      res.json({
        covid_data: result
      })
    }
  })
});

app.get('/get_all_distict_states', (req, res) => {
  sql_connection.query(`SELECT DISTINCT State_Ab FROM COVIDDATA`, (err, result) => {
    if (err) {
      return res.send(err)
    }
    else {
      res.json({
        states: result
      })
    }
  })
});

app.post('/insert_county', (req, res) => {
  sql_connection.query(`INSERT INTO COUNTIES(COUNTIES.County_Name, COUNTIES.State_Ab, COUNTIES.Population) VALUES (\'${req.body.County_Name}\',\'${req.body.State_Ab}\',\'${req.body.Population}\')`, (err, result) => {
    if (err) {
      return res.json({ status: `FAILED TO INSERT (\'${req.body.County_Name}\',\'${req.body.State_Ab}\',\'${req.body.Population}\')` })
    }
    else {
      res.json({
        status:`SUCCESSFULLY INSERTED (\'${req.body.County_Name}\',\'${req.body.State_Ab}\',\'${req.body.Population}\')`
      })
    }
  })
});

app.post('/get_all_distict_counties', (req, res) => {
  sql_connection.query(`SELECT DISTINCT County_Name FROM COUNTIES WHERE State_Ab=\'${req.body.State_Ab}\'`, (err, result) => {
    if (err) {
      return res.send(err)
    }
    else {
      res.json({
        counties: result
      })
    }
  })
});

app.post('/update_county', (req, res) => {
  sql_connection.query(`UPDATE COUNTIES SET County_Name = \'${req.body.New_County_Name}\' WHERE State_Ab = \'${req.body.State_Ab}\' AND County_Name = \'${req.body.County_Name}\'`, (err, result) => {
    if (err) {
      return res.json({ status: `FAILED TO UPDATE FROM \'${req.body.County_Name}\' TO \'${req.body.New_County_Name}\' IN \'${req.body.State_Ab}\'` })
    }
    else {
      res.json({
        status: `SUCCESSFULLY UPDATED FROM \'${req.body.County_Name}\' TO \'${req.body.New_County_Name}\' IN \'${req.body.State_Ab}\'`
      })
    }
  })
})

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
