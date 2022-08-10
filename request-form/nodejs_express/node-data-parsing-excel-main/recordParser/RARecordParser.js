const BaseRecordParser = require('./BaseRecordParser');
class RARecordParser extends BaseRecordParser {
  record_type = 'RA';

  parse(record) {
    const cells = record.split(/\s{3,}/);

    return {
      record_type: this.record_type,
      version_or_release_number: cells[0].slice(2, 4),
      client_name: cells[0].slice(4),
      creation_date: cells[1].slice(0, 8),
      creation_time: cells[1].slice(8, 12),
      batch_number: cells[1].slice(12, 19),
      file_structure_type: cells[1].slice(19, 20),
      transfer_type: cells[1].slice(20, 21),
      receiver_id: '',
      destination_name: cells[2],
      sender_name: cells[3],
      address_line_1: cells[4],
      address_line_2: '',
      city: cells[5],
      state: cells[6].slice(0, 2).toUpperCase(),
      zip_or_postal_code: cells[6].slice(2).trim(),
      last_name: cells[7],
      first_name: cells[8],
      telephone_number: cells[9].slice(0, 10),
      file_type: cells[9].slice(10),
      filler: '',
    };
  }
}

module.exports = RARecordParser;
