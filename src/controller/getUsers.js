const runQuery = require('../db/db');

const getUsers = async (req, res) => {
  try {
    const query = `SELECT first_name , last_name , email , phone , code, image FROM users 
      left join user_images 
      on users.id = user_images.user_id 
      where deleted_at IS NULL`;
    const result = await runQuery(query);
    if (!result) {
      res.status(400).json({ msg: 'No Users Found' });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = getUsers;
