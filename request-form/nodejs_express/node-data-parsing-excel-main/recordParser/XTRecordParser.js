const BaseRecordParser = require('./BaseRecordParser');

class XTRecordParser extends BaseRecordParser {
  record_type = 'XT';

  parse(record) {
    const trimmed = record.trim();
    const cells = trimmed.split(/\s{3,}/);

    return {
      record_type: this.record_type,
      batch_number: cells[0].slice(2, 9),
      total_record_count: this.toNumStr(cells[0].slice(9)),
    };
  }
}

module.exports = XTRecordParser;
