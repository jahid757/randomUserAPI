const fs = require("fs");
const dataPath = __dirname + "/../db/database.json";

const saveUserData = (data) => {
  const stringifyData = JSON.stringify(data, null, 2);
  fs.writeFileSync(dataPath, stringifyData,'utf8');
};

// get all data

const getAllUserData = () => {
  const userData = fs.readFileSync(dataPath);
  return JSON.parse(userData);
};

module.exports = {
  saveUserData,
  getAllUserData,
};
