class BaseRecordParser {
  record_type = '';

  parse(record) {
    console.log('[WARNING]: Not Implemented! ');
    console.log(`[DEBUG]: Called parser with argument: ${record}`);
  }

  toNumStr(record) {
    // returns '123' from '0123'
    return Number(record).toString();
  }
}

module.exports = BaseRecordParser;
