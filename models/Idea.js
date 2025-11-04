const pool = require('../db/conn');

class Idea {
  static async create({ customer_id, title, description, category }) {
    const query = `
      INSERT INTO idea (customer_id, title, description, category) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    
    const result = await pool.query(query, [customer_id, title, description, category]);
    return result.rows[0];
  }

  static async findAllWithVotes() {
    const query = `
      SELECT 
        i.*,
        c.name as author_name,
        COUNT(v.id) as vote_count
      FROM idea i
      LEFT JOIN customer c ON i.customer_id = c.id
      LEFT JOIN vote v ON i.id = v.idea_id
      GROUP BY i.id, c.name
      ORDER BY vote_count DESC, i.created_at DESC
    `;
    
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = `
      SELECT 
        i.*,
        c.name as author_name,
        COUNT(v.id) as vote_count
      FROM idea i
      LEFT JOIN customer c ON i.customer_id = c.id
      LEFT JOIN vote v ON i.id = v.idea_id
      WHERE i.id = $1
      GROUP BY i.id, c.name
    `;
    
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, { title, description, category }) {
    const query = `
      UPDATE idea 
      SET title = $1, description = $2, category = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4 
      RETURNING *
    `;
    
    const result = await pool.query(query, [title, description, category, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM idea WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByCustomerId(customer_id) {
    const query = 'SELECT * FROM idea WHERE customer_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [customer_id]);
    return result.rows;
  }

  static async isAuthor(ideaId, customerId) {
    const query = 'SELECT customer_id FROM idea WHERE id = $1';
    const result = await pool.query(query, [ideaId]);
    
    if (result.rows.length === 0) return false;
    return result.rows[0].customer_id === customerId;
  }
}

module.exports = Idea;