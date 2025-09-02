
const authUser = {
  createUser: async (user, hashedPassword, pool) => {
    const [result] = await pool.execute(
      'INSERT INTO auth_user (email, first_name, last_name, password) VALUES (?, ?, ?, ?)',
      [user.email, user.first_name, user.last_name, hashedPassword]
    );
    return result.insertId;
  },

};

export default authUser;
