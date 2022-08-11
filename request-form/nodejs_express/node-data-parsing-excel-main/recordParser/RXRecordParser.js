const BaseRecordParser = require('./BaseRecordParser');

class RXRecordParser extends BaseRecordParser {
  record_type = 'RX';

  parse(record) {
    const cells = record.split(/\s{3,}/);

    return {
      record_type: this.record_type,
      cardholder_id: this.toNumStr(cells[0].slice(2)),
      alternate_id_number: '',
      cardholder_lastname: cells[1],
      cardholder_firstname: cells[2],
      cardholder_middle_initial: '',
      patient_lastname: cells[3],
      patient_firstname: cells[4],
      patient_middle_initial: '',
      patient_residence: '',
      address_line_1: cells[5],
      city: cells[6],
      state: cells[7].slice(0, 2),
      zip_or_postal_code: cells[7].slice(2),
      telephone_number_qualifier: cells[8].slice(0, 2),
      telephone_number: cells[8].slice(2, 12),
      patient_email: cells[8].slice(12),
      date_of_birth: cells[9].slice(0, 8),
      patient_gender: cells[9].slice(8),
      pregnancy_indicator: '',
      smoker_or_non_smoker_code: '',
      easy_open_cap_indicator: '',
      prescription_or_service_reference_number: cells[10].slice(0, 12),
      date_prescription_written: cells[10].slice(12, 20),
      orignally_prescribed_product_or_service_id_qualifier: this.toNumStr(
        cells[10].slice(20),
      ).slice(0, 1),
      originally_prescribed_product_or_service_code: this.toNumStr(
        cells[10].slice(20),
      ).slice(1),
      compound_code: cells[11].slice(0, 1),
      prescribed_drug_description: cells[11].slice(1),
      product_dosage_form: cells[12],
      product_strength: cells[13],
      dispense_as_written_product: cells[14].slice(0, 1),
      quantity_prescribed: this.toNumStr(cells[14].slice(1, 11)),
      number_of_refills_authorized: this.toNumStr(cells[14].slice(11, 13)),
      days_supply: this.toNumStr(cells[14].slice(13, 16)),
      product_or_service_id_qualifier: this.toNumStr(cells[14].slice(16, 18)),
      product_or_service_id: cells[14].slice(18),
      drug_description: cells[15],
      label_directions: cells[16],
      original_dispensed_date: cells[17].slice(0, 8),
      original_dispensed_quantity: this.toNumStr(cells[17].slice(8, 18)),
      most_recent_date_filled: cells[17].slice(18, 26),
      quantity_dispensed_to_date: this.toNumStr(cells[17].slice(26, 36)),
      remaining_quantity: this.toNumStr(cells[17].slice(36, 46)),
      number_of_fills_to_date: this.toNumStr(cells[17].slice(46, 48)),
      number_of_fills_remaining: this.toNumStr(cells[17].slice(48, 50)),
      fill_number: this.toNumStr(cells[17].slice(50, 55)),
      discontinue_date: this.toNumStr(cells[17].slice(55, 60)),
      inactive_prescription_indicator: cells[17].slice(60, 61),
      transfer_flag: '',
      sec_last_name: cells[17].split(' ')[1],
      sec_first_name: cells[18],
      sec_address_line_1: cells[19],
      sec_city: cells[20],
      sec_state: cells[21].slice(0, 2).toUpperCase(),
      sec_zip_or_postal_code: cells[21].slice(2),
      sec_telephone_number_qualifier: cells[22].slice(0, 2),
      sec_telephone_number: cells[22].slice(2),
      prescriber_id_dea: '',
      prescriber_id_qualifier: this.toNumStr(cells[23].slice(0, 2)),
      prescriber_id: cells[23].slice(2),
      additional_message_information: '',
      payer_id_qualifier: '',
      payer_id: '',
      processor_control_number: '',
      group_id: '',
      person_code: cells[24].slice(2, 3),
      patient_relationship_code: cells[24].slice(3),
      filler: '',
    };
  }
}

module.exports = RXRecordParser;