const runQuery = require('../db/db');
const path = require('path');
const fs = require('fs');

const deleteUser = async (req, res) => {
  try {
    var query = `UPDATE users SET deleted_at = current_timestamp WHERE id='${req.params.id}' RETURNING id`;
    const result = await runQuery(query);

    var imageQuery = `Select image from user_images where user_id='${req.params.id}'`;
    const resultGetImage = await runQuery(imageQuery);

    if (result.rows[0].id && resultGetImage.rows.length) {
      const deleteQuery = `DELETE from user_images WHERE user_id='${req.params.id}' RETURNING id`;
      const deleteQueryresult = await runQuery(deleteQuery);
      if (deleteQueryresult.rows[0].id) {
        const Imagepath = path.join(
          __dirname,
          `../uploads/${resultGetImage.rows[0].image}`
        );
        fs.unlinkSync(Imagepath);
      }
    }
    return res.status(200).json({ msg: 'User is successfully deleted' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = deleteUser;
