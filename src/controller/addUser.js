const runQuery = require('../db/db');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const validateCredentials = ({
  first_name,
  last_name,
  email,
  password,
  phone,
  code
}) => {
  if (
    !validator.isEmpty(first_name) &&
    !validator.isEmpty(last_name) &&
    !validator.isEmpty(email) &&
    !validator.isEmpty(phone) &&
    !validator.isEmpty(code) &&
    !validator.isEmpty(password)
  ) {
    if (
      validator.isEmail(email) &&
      validator.isMobilePhone(phone) &&
      validator.isLength(code.toString(), 6, 6)
    ) {
      return true;
    }
    return false;
  } else {
    return false;
  }
};

const checkIfEmailExist = async (email) => {
  const query = `SELECT email FROM users WHERE email='${email}'`;
  const result = await runQuery(query);
  if (result.rowCount) {
    return true;
  }
  return false;
};

const checkIfPhoneExist = async (phone) => {
  const query = `SELECT phone FROM users WHERE phone='${phone}'`;
  const result = await runQuery(query);
  if (result.rowCount) {
    return true;
  }
  return false;
};

const checkIfCodeExist = async (code) => {
  const query = `SELECT code FROM users WHERE code='${code}'`;
  const result = await runQuery(query);
  if (result.rowCount) {
    return true;
  }
  return false;
};
const addUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone, code } = req.body;
    const valid = validateCredentials(req.body);
    if (!valid) {
      return res.status(400).json({ msg: 'Invalid Inputs' });
    }
    const emailExist = await checkIfEmailExist(email);
    if (emailExist) {
      return res.status(400).json({ msg: 'Email Already exist' });
    }
    const phoneExist = await checkIfPhoneExist(phone);
    if (phoneExist) {
      return res.status(400).json({ msg: 'Mobile number Already exist' });
    }
    const codeExist = await checkIfCodeExist(code);
    if (codeExist) {
      return res.status(400).json({ msg: 'Code Already exist' });
    }
    const hashPassword = await bcrypt.hash(password, 8);
    const query = `INSERT INTO users(first_name, last_name, email, password, phone, code, created_at) VALUES('${first_name}','${last_name}','${email}','${hashPassword}', '${phone}', '${code}', current_timestamp) RETURNING id`;
    const result = await runQuery(query);

    if (result.rows.length) {
      if (req.file) {
        const image = req.file.filename;
        const query = `INSERT INTO user_images(user_id, image) VALUES('${result.rows[0].id}','${image}')`;
        const results = await runQuery(query);

        if (!results.rows.length)
          return res.status(500).json({ msg: 'Unable to insert image' });
      }
      return res.status(200).json({ msg: 'User is successfully added' });
    } else {
      throw new Error('Not able to add user');
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = addUser;
