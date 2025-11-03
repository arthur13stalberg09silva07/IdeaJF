const pool = require('../db/connection');
const bcrypt = require('bcryptjs');

class Customer {
  static async create({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = `
      INSERT INTO customer (name, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING id, name, email, created_at
    `;
    
    const result = await pool.query(query, [name, email, hashedPassword]);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM customer WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, name, email, created_at FROM customer WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = Customer;