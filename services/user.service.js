const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '../db/users.json');

exports.findAll = async () => {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

exports.create = async (payload = {}) => {
  const data = await fs.readFile(filePath, 'utf8');
  const users = JSON.parse(data);
  users.push(payload);
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
  return payload;
};
