const Excel = require('exceljs');

class Xls {

  constructor(path){
    this.filePath = path
  }

  download() {
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('My Sheet');
    let tempFilePath = this.filePath;
    worksheet.columns = [
              { header: 'Id', key: 'id', width: 10 },
              { header: 'Name', key: 'name', width: 32 },
              { header: 'D.O.B.', key: 'dob', width: 10 }
          ];
    worksheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970,1,1)});
    worksheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965,1,7)});
    // return a promise
    return workbook.xlsx.writeFile(tempFilePath);
  }
}

module.exports = Xls;