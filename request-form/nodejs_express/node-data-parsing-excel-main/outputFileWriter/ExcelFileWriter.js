const excel = require('exceljs');
const startcase = require('lodash.startcase');

const BaseFileWriter = require('./BaseFileWriter');

class ExcelFileWriter extends BaseFileWriter {
  async writeToFile(fileContent, filename) {
    console.log(`[INFO]: Writing output to file: ${filename} ...`);
    const options = {
      filename,
      useStyles: true,
      useSharedStrings: true,
    };

    const workbook = new excel.stream.xlsx.WorkbookWriter(options);
    const worksheet = workbook.addWorksheet('Records');
    const recordsByType = fileContent
      .filter(Boolean)
      .reduce((accumulator, record) => {
        if (!accumulator[record.record_type]) {
          accumulator[record.record_type] = [];
        }
        accumulator[record.record_type].push(record);
        return accumulator;
      }, {});

    Object.values(recordsByType).forEach((recordSet) => {
      const sampleRecord = recordSet[0];
      const recordTitles = Object.keys(sampleRecord).map((key) =>
        startcase(key).toUpperCase(),
      );

      worksheet.addRow(recordTitles);
      recordSet.forEach((record) => {
        worksheet.addRow(Object.values(record));
      });
      worksheet.addRow([]);
    });

    console.log(`[INFO]: Written output to excel file: ${filename}`);

    return await workbook.commit();
  }
}

module.exports = ExcelFileWriter;
