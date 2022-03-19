const runQuery = require('../db/db');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const validateCredentials = ({ first_name, last_name, email, phone, code }) => {
  if (
    !validator.isEmpty(first_name) &&
    !validator.isEmpty(last_name) &&
    !validator.isEmpty(email) &&
    !validator.isEmpty(phone) &&
    !validator.isEmpty(code)
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

const editUser = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, code } = req.body;
    const valid = validateCredentials(req.body);
    if (!valid) {
      return res.status(400).json({ msg: 'Invalid Inputs' });
    }
    console.log('req.params.id', req.params.id);
    let query = `UPDATE users SET first_name ='${first_name}', last_name = '${last_name}', email ='${email}', phone='${phone}', code='${code}', updated_at = current_timestamp WHERE id='${req.params.id}' RETURNING email`;
    const result = await runQuery(query);

    if (result.rows[0].email && req.file) {
      const image = req.file.filename;
      var oldimageQuery = `Select image from user_images where user_id='${req.params.id}'`;
      const resultGetImage = await runQuery(oldimageQuery);
      if (resultGetImage.rows.length) {
        let query = `UPDATE user_images SET image = '${image}' WHERE user_id='${req.params.id}' RETURNING id`;
        const resultUpdateImage = await runQuery(query);
        if (resultUpdateImage.rows[0].id) {
          const Imagepath = path.join(
            __dirname,
            `../uploads/${resultGetImage.rows[0].image}`
          );
          fs.unlinkSync(Imagepath);
        }
      } else {
        const query = `INSERT INTO user_images(user_id, image) VALUES('${req.params.id}','${image}')`;
        const results = await runQuery(query);
      }
    }
    return res.status(200).json({ msg: 'User is successfully updated' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = editUser;
