const fs = require('fs');
const Parser = require('../recordParser');

const recordTypeToParserMap = {
  RA: Parser.RARecordParser,
  SR: Parser.SRRecordParser,
  RX: Parser.RXRecordParser,
  ST: Parser.STRecordParser,
  XT: Parser.XTRecordParser,
};

const readFileContent = (filePath, encoding = 'utf8') => {
  console.log(`[INFO]: Reading file: ${filePath}`);
  try {
    return fs.readFileSync(filePath, encoding, 4);
  } catch (err) {
    console.error(err);
    return '';
  }
};

const getRecordParserForRecord = (record) => {
  const recordType = record.slice(0, 2).toUpperCase();

  if (!recordType) {
    return new Parser.BaseRecordParser();
  }

  const RecordParser = recordTypeToParserMap[recordType];
  return new RecordParser();
};

module.exports = {
  readFileContent,
  getRecordParserForRecord,
};
