import pool from '../config/db.js';


export const getUsers = async (req, res) => {
  const [users] = await pool.execute('SELECT id, email, first_name, last_name FROM auth_user');
  res.json(users);
};
