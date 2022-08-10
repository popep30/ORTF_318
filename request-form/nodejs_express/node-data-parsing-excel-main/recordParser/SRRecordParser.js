const BaseRecordParser = require('./BaseRecordParser');

class SRRecordParser extends BaseRecordParser {
  record_type = 'SR';

  parse(record) {
    const cells = record.split(/\s{3,}/);
    const cell1 = this.toNumStr(cells[1]);
    const cell9 = this.toNumStr(cells[9]);

    return {
      record_type: this.record_type,
      sending_pharmacy_id: this.toNumStr(cells[0].slice(2)),
      service_provider_id_qualifier: cell1.slice(0, 1),
      service_provider_id: cell1.slice(1),
      service_provider_id_dea_number: cells[2],
      pharmacy_name: cells[3],
      address_line_1: cells[4],
      address_line_2: '',
      city: cells[5],
      state: cells[6].slice(0, 2),
      zip_or_postal_code: cells[6].slice(2),
      telephone_number: cells[7].slice(0, 10),
      last_name: cells[7].slice(10),
      first_name: cells[8],
      sec_service_provider_id_qualifier: cell9.slice(0, 1),
      sec_service_provider_id: cell9.slice(1),
      sec_service_provider_id_dea_number: '',
      sec_pharmacy_name: cells[10].slice(0, 20),
      sec_address_line_1: cells[10].slice(20),
      sec_address_line_2: '',
      sec_city: cells[11],
      sec_state: cells[12].slice(0, 2).toUpperCase(),
      sec_zip_or_postal_code: cells[12].slice(2),
      sec_telephone_number: cells[13].slice(0, 10),
      sec_last_name: cells[13].slice(10),
      sec_first_name: cells[14],
      filler: '',
    };
  }
}

module.exports = SRRecordParser;
