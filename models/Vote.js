const pool = require('../db/connection');

class Vote {
  static async create({ customer_id, idea_id }) {
    const query = `
      INSERT INTO vote (customer_id, idea_id) 
      VALUES ($1, $2) 
      RETURNING *
    `;
    
    const result = await pool.query(query, [customer_id, idea_id]);
    return result.rows[0];
  }

  static async exists({ customer_id, idea_id }) {
    const query = 'SELECT id FROM vote WHERE customer_id = $1 AND idea_id = $2';
    const result = await pool.query(query, [customer_id, idea_id]);
    return result.rows.length > 0;
  }

  static async delete({ customer_id, idea_id }) {
    const query = 'DELETE FROM vote WHERE customer_id = $1 AND idea_id = $2 RETURNING *';
    const result = await pool.query(query, [customer_id, idea_id]);
    return result.rows[0];
  }

  static async countByIdeaId(idea_id) {
    const query = 'SELECT COUNT(*) FROM vote WHERE idea_id = $1';
    const result = await pool.query(query, [idea_id]);
    return parseInt(result.rows[0].count);
  }
}

module.exports = Vote;