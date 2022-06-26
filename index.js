// get the client
const mysql = require('mysql2');

// create the connection to database
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'root',
    database: 'employeedb'
  });

  mysqlConnection.connect((err) => {
    if(!err){
        console.log('DB connection succeded');
    }
    else{
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
    }
  });