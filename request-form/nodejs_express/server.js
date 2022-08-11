var express = require('express');
var app = express();
var cors = require('cors');
const mysql = require('mysql')
const mysql_connection = mysql.createConnection(
    {
        host:'iobase.czcrcd2qqooy.us-east-1.rds.amazonaws.com',
    user:'web_apps',
    database:'fusion',
    password:'Lqj4m4AiFC8eBMSZeB',
    port: 3306
}
)
mysql_connection.connect( err => {
    if (err)
    {
        console.error('Aurora DB issue', err.stack);
        return;
    }
    console.log('Connected to Aurora')
});



corsOptions = {
    origin: '*',
    opetionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.post('/save-to-db', (rq, res) => {
    // save to mysql/aurora DB
let ortfRequestID = req.body["ORTFRequestID"] == undefined ? null : req.body["ORTFRequestID"];
let clientName = req.body["ClientName"] == undefined ? '' : req.body["ClientName"];
let ortfDirectionID = req.body["ORTFDirectionID"] == undefined ? null : req.body["ORTFDirectionID"];
let ortfTypeID = req.body["ORTFTypeID"] == undefined ? null : req.body["ORTFTypeID"];
let requestedDate = req.body["RequestedDate"] == undefined ? '' : req.body["RequestedDate"];
let jiraTicket = req.body["JIRATicket"] == undefined ? '' : req.body["JIRATicket"];
let createUser = req.body["CreateUser"] == undefined ? '' : req.body["CreateUser"];
let createDateTime = req.body["CreateDateTime"] == undefined ? '' : req.body["CreateDateTime"];

    mysql_connection.query(`INSERT INTO 'fusion'.'ortf_request' ('ORTFRequestID', 'ClientName', 'ORTFDirectionID', 'ORTFTypeID', 'RequestedDate', 'JIRATicket', 'CreateUser', 'CreateDateTime') VALUES (${ortfRequestID}, ${clientName}, ${ortfDirectionID}, ${ortfTypeID}, ${requestedDate}, ${jiraTicket}, ${createUser}, ${createDateTime})`, (err, rows, fields) => {
        if (err){
            console.error('issue while selectiong rows from fusion', err);
            return;
        }
        console.log('Request status lookup', rows)
        res.send(rows);
    });
});
app.get('/ortf-request-status', function (req, res) {
    mysql_connection.query('select `StatusID` AS `id`, `StatusTypeID` AS `statusTypeId`, `StatusName` AS `statusName` from fusion.ortf_status_lookup', (err, rows, fields) => {
        if (err){
            console.error('issue while selectiong rows from fusion', err);
            return;
        }
        console.log('Request status lookup', rows)
        res.send(rows);
    });
});

app.get('/', function (req, res) {

    var sql = require("mssql");

    // config for your database
    var config = {
        // driver:'msnodesqlv8',
        domain: 'MBH',
        user: 'popep',
        password: 'AugustCarter22!!!',
        server: 'STLMRXSQL197.mbh.mhs.magellanhealth.com',
        //'', 
        database: 'master',
        //trusted: false,
        encrypt: false,
        options: {
            trustedConnection: true
        }
    };

    // connect to your database
    // TODO connect only once as needed, not every time the method is called.
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