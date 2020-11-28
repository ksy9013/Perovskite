//Din 'Max' Chan, 1001352842
//Seonyoung 'Kaylee' Kim, 1001757188

const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const sql_connection = mysql.createConnection({
  host: 'perovkite-solar.c1obqc4j40zi.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'password',
  database: 'perovskite_solar',
  port: 3380
});

sql_connection.connect(err => {
  if (err) {
    console.log('ERROR!');
    return err;
  }
  else {
    console.log('CONNECTED!');
  }
});

app.get('/get_emp_type', (req, res) => {
  sql_connection.query(`SELECT DISTINCT e_type FROM SALES_REP UNION SELECT e_type FROM TECHNICIAN UNION SELECT e_type FROM ASSEMBLER`, (err, result) => {
    if (err) {
      return res.send(err)
    }
    else {
      res.json({
        types: result
      })
    }
  })
});

app.post('/insert_info', (req, res) => {
  sql_connection.query(`INSERT INTO ?? (ID, Fname, Lname, SSN, Pay, Start_Date, e_type) 
  VALUES (\'${req.body.ID}\',\'${req.body.Fname}\',\'${req.body.Lname}\',\'${req.body.SSN}\',\'${req.body.Pay}\', \'${req.body.Start_Date}\', \'${req.body.e_type}\')`, [req.body.e_type], (err, result) => {
    if (err) {
      return res.json({ status: 'FAILED TO INSERT ' + req.body.e_type })
    }
    else {
      res.json({
        status: `SUCCESSFULLY INSERTED !!!`
      })
    }
  })
});


app.post('/get_all_emp_info', (req, res) => {
  sql_connection.query(`SELECT ID, Fname, Lname, SSN, Pay, Start_Date, e_type FROM ?? 
  WHERE ID = \'${req.body.ID}\'`, [req.body.e_type], (err, result) => {
    if (err) {
      return res.send(err)
    }
    else if (result.message === null) {
      return res.json({ status: `There's no result.` })
    }
    else {
      res.json({
        empdata: result
      })
    }
  })
});

app.post('/display_all_emp_info', (req, res) => {
  sql_connection.query(`SELECT ID, Fname, Lname, SSN, Pay, Start_Date, e_type FROM ?? 
  WHERE e_type = \'${req.body.e_type}\'`, [req.body.e_type], (err, result) => {
    if (err) {
      return res.send(err)
    }
    else if (result.message === null) {
      return res.json({ status: `There's no result.` })
    }
    else {
      res.json({
        empdata: result
      })
    }
  })
});

app.post('/delete_emp', (req, res) => {
  sql_connection.query(`DELETE FROM ?? WHERE e_type = \'${req.body.e_type}\' AND ID = \'${req.body.ID}\'`, [req.body.e_type], (err, result, fields) => {
    if (err) {
      return res.json({ status: `FAILED TO DELETE \'${req.body.ID}\' IN \'${req.body.e_type}\'` })
    }
    else if (result.message === null) {
      return res.json({ status: `Cannot delete. Please enter the correct information.` })
    }

    else {
      res.json({
        status: `SUCCESSFULLY DELETED!!!`
      })
    }

  })
})

app.post('/update_emp', (req, res) => {
  if (req.body.e_type != req.body.New_eType) {
    sql_connection.query(`INSERT INTO ?? (ID, Fname, Lname, SSN, Pay, Start_Date, e_type) 
    VALUES (\'${req.body.emp_data[0].ID}\',\'${req.body.New_Fname}\',\'${req.body.New_Lname}\',\'${req.body.emp_data[0].SSN}\',\'${req.body.New_Pay}\', \'${req.body.emp_data[0].Start_Date}\', \'${req.body.New_eType}\')`, [req.body.New_eType], (err, result) => {
      if (err) {
        return res.json({ status: `FAILED TO INSERT AN INFO TO \'${req.body.New_eType}\'` })
      }
      else {
        sql_connection.query(`DELETE FROM ?? WHERE e_type = \'${req.body.e_type}\' AND ID = \'${req.body.ID}\'`, [req.body.e_type], (err, result, fields) => {
          if (err) {
            return res.json({ status: `FAILED TO DELETE \'${req.body.ID}\' IN \'${req.body.e_type}\'` })
          }
          else if (result.message === null) {
            return res.json({ status: `Cannot delete. Please enter the correct information.` })
          }     
        })
        res.json({
          status: `SUCCESSFULLY UPDATED!!`
        })
      }
    })
  }

  else {
    sql_connection.query(`UPDATE ?? SET e_type = \'${req.body.New_eType}\', Pay = \'${req.body.New_Pay}\', Fname = \'${req.body.New_Fname}\', Lname = \'${req.body.New_Lname}\' WHERE ID = \'${req.body.emp_data[0].ID}\'`, [req.body.e_type], (err, result) => {
      if (err) {
        return res.json({ status: `FAILED TO UPDATE THE INFORMATION` })
      }
      else {
        res.json({
          status: `SUCCESSFULLY UPDATED!`
        })
      }
    })
  }
})


app.listen(5000, () => {
  console.log(`Server is running on port: 5000`);
});


