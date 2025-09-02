import mysql from 'mysql2/promise';


const pool = mysql.createPool({
  host: 'localhost', user: 'root', password: '@Samar1002s', database: 'codeigniter'
});


export default pool;
