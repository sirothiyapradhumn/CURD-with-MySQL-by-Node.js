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
    multipleStatements: true  // use for execute multiple statement query line no. 79
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


// Insert an employee
app.post('/employee', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].EmpID);
            });
        else
            console.log(err);
    })
});

/*  use this in postman for req post 
{
    "EmpID":0,
    "Name": "Green Fiona",
    "EmpCode": "EMP934",
    "Salary": 415600
}

*/

// update an employee
app.put('/employee', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            res.send("Update successfully");
        else
            console.log(err);
    })
});