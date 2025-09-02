const Teacher = {
  createTeacher: async (teacher, userId, pool) => {
    const [result] = await pool.execute(
      'INSERT INTO teacher (user_id, university_name, gender, year_joined) VALUES (?, ?, ?, ?)',
      [userId, teacher.university_name, teacher.gender, teacher.year_joined]
    );
    return result.insertId;
  }
};
export default Teacher;