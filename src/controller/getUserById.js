const runQuery = require('../db/db');

const getUserById = async (req, res) => {
  try {
    const query = `SELECT users.id, first_name , last_name , email , phone , code, image FROM users 
      left join user_images 
      on users.id = user_images.user_id 
      where users.id='${req.params.id}'`;
    const result = await runQuery(query);
    if (!result.rowCount) {
      return res.status(400).json({ msg: 'No Users Found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = getUserById;
