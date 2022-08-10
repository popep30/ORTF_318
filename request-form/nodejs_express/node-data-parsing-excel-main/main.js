require('dotenv').config();

const { getRecordParserForRecord, readFileContent } = require('./lib');
const { ExcelFileWriter } = require('./outputFileWriter');
const { writeFileToS3Bucket } = require('./vendors/aws');

const SAMPLE_INPUT_FILE = 'yoo.txt';
const SAMPLE_OUTPUT_FILE = 'yee.xlsx';

const extractFileContentAndWriteToS3 = (
  inputFileName,
  outputFileName,
) => {
  const rawFileContent = readFileContent(inputFileName);
  const records = rawFileContent.split('\n');
  const parsedFileContent = records.reduce((accumulator, record) => {
    const parser = getRecordParserForRecord(record);
    return [...accumulator, parser.parse(record)];
  }, []);
  const outputFileWriter = new ExcelFileWriter();
  return outputFileWriter.writeToFile(parsedFileContent, outputFileName);
  //await writeFileToS3Bucket(outputFileName);
};

//extractFileContentAndWriteToS3(SAMPLE_INPUT_FILE, SAMPLE_OUTPUT_FILE);

module.exports = extractFileContentAndWriteToS3;
