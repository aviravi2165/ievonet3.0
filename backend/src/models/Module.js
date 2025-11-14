const pool = require('../config/database');

class Module {
  static async getAll() {
    const result = await pool.query(
      'SELECT * FROM modules WHERE is_active = true ORDER BY order_index ASC'
    );
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query(
      'SELECT * FROM modules WHERE id = $1 AND is_active = true',
      [id]
    );
    return result.rows[0];
  }

  static async getByName(name) {
    const result = await pool.query(
      'SELECT * FROM modules WHERE name = $1 AND is_active = true',
      [name]
    );
    return result.rows[0];
  }

  static async create(data) {
    const { name, label, description, icon, order_index } = data;
    const result = await pool.query(
      `INSERT INTO modules (name, label, description, icon, order_index)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, label, description, icon, order_index || 0]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { label, description, icon, order_index, is_active } = data;
    const result = await pool.query(
      `UPDATE modules
       SET label = COALESCE($2, label),
           description = COALESCE($3, description),
           icon = COALESCE($4, icon),
           order_index = COALESCE($5, order_index),
           is_active = COALESCE($6, is_active),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [id, label, description, icon, order_index, is_active]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query(
      'DELETE FROM modules WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }

  static async getWithMenuItems() {
    const result = await pool.query(`
      SELECT 
        m.*,
        json_agg(
          json_build_object(
            'id', mi.id,
            'name', mi.name,
            'label', mi.label,
            'path', mi.path,
            'icon', mi.icon,
            'order_index', mi.order_index,
            'parent_id', mi.parent_id,
            'is_active', mi.is_active
          )
          ORDER BY mi.order_index ASC
        ) FILTER (WHERE mi.is_active = true) as menu_items
      FROM modules m
      LEFT JOIN menu_items mi ON m.id = mi.module_id
      WHERE m.is_active = true
      GROUP BY m.id
      ORDER BY m.order_index ASC
    `);
    return result.rows;
  }
}

module.exports = Module;
