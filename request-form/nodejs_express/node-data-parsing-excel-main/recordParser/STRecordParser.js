const BaseRecordParser = require('./BaseRecordParser');

class STRecordParser extends BaseRecordParser {
  record_type = 'ST';

  parse(record) {
    const trimmed = record.trim();
    const cells = trimmed.split(/\s{3,}/);

    return {
      record_type: this.record_type,
      sending_pharmacy_id: cells[0].slice(2),
      service_provider_id_qualifier: this.toNumStr(cells[1].slice(0, 2)),
      service_provider_id: cells[1].slice(2),
      sec_service_provider_id_qualifier: this.toNumStr(cells[2].slice(0, 2)),
      sec_service_provider_id: cells[2].slice(2),
      total_number_of_sending_and_receiving_pharmacy_records: this.toNumStr(
        cells[3],
      ),
    };
  }
}

module.exports = STRecordParser;
