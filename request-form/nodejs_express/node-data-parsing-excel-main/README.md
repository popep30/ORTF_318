### node-data-parsing-excel

This script performs the following operations;

- Reads the content of an input `.txt` file
- Parses this input and extracts data as per specifications here: https://sheet.zohopublic.com/sheet/open/525cobcbc8375de70479c8a2ac0ee51440147?sheet=Sheet1&range=H4
- Writes the parsed input into an excel file.
- Uploads the excel file to an S3 bucket.


To upload to S3, you need to provide the environment variables specified in the `sample.env` file. 



### Usage

Within your lambda function, 

```javascript
const extractFileContentAndWriteToS3 = require('./main');

const inputFile = 'Path to input file derived from the request context.txt'
const outputFile = 'Desired name of output file in S3 bucket.'

extractFileContentAndWriteToS3(inputFile, outputFile)
```


