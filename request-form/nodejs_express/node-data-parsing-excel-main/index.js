require('dotenv').config();
const aws = require('aws-sdk');

const { getRecordParserForRecord } = require('./lib');
const { ExcelFileWriter } = require('./outputFileWriter');
const { writeFileToS3Bucket } = require('./vendors/aws');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });


exports.handler = async (event, context) => {

    // Get the object from the event and show its content type
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const params = {
        Bucket: bucket,
        Key: key,

    };
    try {
        const hey = await s3.getObject(params).promise();
        
        const rawFileContent = hey.Body.toString('utf-8');
        const records = rawFileContent.split('\n');
        const parsedFileContent = records.reduce((accumulator, record) => {
          const parser = getRecordParserForRecord(record);
          return [...accumulator, parser.parse(record)];
        }, []);
        const outputFileWriter = new ExcelFileWriter();
        const outputFileName = '/tmp/final.xlsx';
        const preferreds3Location = `mrx-ortf/snaplogic-excels/${key.split('/').slice(-1)[0].replace('.txt', '.xlsx')}`;
        await outputFileWriter.writeToFile(parsedFileContent, outputFileName);
        await writeFileToS3Bucket(outputFileName, preferreds3Location);

        return hey.ContentType;
    } catch (err) {
        console.log('an err==>>>', err);
        const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
        console.log(message);
        throw new Error(message);
    }
};
