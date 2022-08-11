var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : "iobase-cluster.cluster-czcrcd2qqooy.us-east-1.rds.amazonaws.com",
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});


connection.end();

