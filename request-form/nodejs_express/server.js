var express = require('express');
var app = express();
var cors = require('cors');
corsOptions = {
origin:'*',
opetionsSuccessStatus:200,

};
app.use(cors(corsOptions));
app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
       // driver:'msnodesqlv8',
       domain:'MBH', 
       user: 'popep',
        password: 'AugustCarter22!!!',
        server: 'STLMRXSQL197.mbh.mhs.magellanhealth.com',
        //'', 
        database: 'master',
        //trusted: false,
        encrypt: false,
        options:{
            trustedConnection: true
        }
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query("SELECT DISTINCT PAYOR_NAME ,PAYOR_CODE AS id ,CONCAT(TRIM(PAYOR_NAME), ' (' ,TRIM(PAYOR_CODE), ')') AS name FROM  EPOSTRX.DBO.PAYORS ORDER BY PAYOR_NAME ,PAYOR_CODE", function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset["recordsets"][0]);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});