// get the client
const mysql = require('mysql2');
const express = require('express');
const bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.json());

// create the connection to database
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'root',
    database: 'employeedb',
    multipleStatements: true
  });


// connection req   
mysqlConnection.connect((err) => {
if(!err){
    console.log('DB connection succeded');
}
else{
    console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
}
});

app.listen(3000, () => console.log('Express server is running at port no : 3000'));


// Get all employees
app.get('/employee', (req, res)=>{
    mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) =>{
        if(!err){
            //console.log(rows[0].EmpID);
            //console.log(rows);
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
}); 


// Get an employees
// /employee/1
app.get('/employee/:id', (req, res)=>{
mysqlConnection.query('SELECT * FROM employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) =>{
    if(!err){
        res.send(rows);
    }
    else{
        console.log(err);
    }
})
});


// Delete an employee
app.delete('/employee/:id', (req, res)=>{
    mysqlConnection.query('DELETE FROM employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) =>{
        if(!err){
            res.send('Delete successfully.');
        }
        else{
            console.log(err);
        }
    })
});

