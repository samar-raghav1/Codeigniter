import pool from "../config/db.js";




export const getTeachers = async (req, res) => {
  const [teachers] = await pool.execute('SELECT * FROM teachers');
  res.json(teachers);
};
