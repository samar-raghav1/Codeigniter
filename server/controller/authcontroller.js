
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import AuthUser from '../models/authUser.js';
import Teacher from '../models/Teacher.js';
import { genToken } from '../config/token.js';

export const registerTeacher = async (req, res) => {
  const { user, teacher } = req.body;
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const userId = await AuthUser.createUser(user, hashedPassword, conn);
    await Teacher.createTeacher(teacher, userId, conn);
    await conn.commit();
    const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure:false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
    res.send({ success: true });
  } catch (err) {
    await conn.rollback();
    res.status(500).send(err.message);
  } finally {
    conn.release();
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const [[user]] = await pool.execute('SELECT * FROM auth_user WHERE email = ?', [email]);
  if (!user || !await bcrypt.compare(password, user.password)) return res.status(401).send('Invalid credentials');
    const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure:false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
  res.json({ token, user });
};
