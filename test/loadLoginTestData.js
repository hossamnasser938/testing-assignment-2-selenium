const fs = require("fs");
const Papa = require("papaparse");

function loadLoginTestData(filePath) {
  const file = fs.readFileSync(filePath, "utf8");

  const { data } = Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
  });

  return data;
}

module.exports = { loadLoginTestData };
