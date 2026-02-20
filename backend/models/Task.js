const { query } = require('../config/database');

class Task {
    static async getAll() {
        const sqlQuery = 'SELECT id, title, description, is_completed, created_at, updated_at FROM Tasks ORDER BY created_at DESC';
        return await query(sqlQuery);
    }

    static async getById(id) {
        const sqlQuery = 'SELECT id, title, description, is_completed, created_at, updated_at FROM Tasks WHERE id = ?';
        const rows = await query(sqlQuery, [id]);
        return rows[0] || null;
    }

    static async create({ title, description }) {
        const sqlQuery = `
      INSERT INTO Tasks (title, description, is_completed, created_at, updated_at) 
      OUTPUT INSERTED.id, INSERTED.title, INSERTED.description, INSERTED.is_completed, INSERTED.created_at, INSERTED.updated_at
      VALUES (?, ?, ?, GETDATE(), GETDATE())
    `;
        const rows = await query(sqlQuery, [title, description, 0]);
        return rows[0];
    }

    static async update(id, { title, description, is_completed }) {
        // Note: In a real app, we'd build the query dynamically or use a library.
        // For this challenge, we'll keep it simple.
        const sqlQuery = `
      UPDATE Tasks 
      SET title = ?, description = ?, is_completed = ?, updated_at = GETDATE()
      OUTPUT INSERTED.id, INSERTED.title, INSERTED.description, INSERTED.is_completed, INSERTED.created_at, INSERTED.updated_at
      WHERE id = ?
    `;
        const rows = await query(sqlQuery, [title, description, is_completed ? 1 : 0, id]);
        return rows[0] || null;
    }

    static async delete(id) {
        const sqlQuery = 'DELETE FROM Tasks WHERE id = ?';
        await query(sqlQuery, [id]);
        return true;
    }

    // Helper to ensure table exists (replacing sequelize.sync)
    static async sync() {
        const sqlQuery = `
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Tasks')
      BEGIN
        CREATE TABLE Tasks (
          id INT IDENTITY(1,1) PRIMARY KEY,
          title NVARCHAR(255) NOT NULL,
          description NVARCHAR(MAX),
          is_completed BIT DEFAULT 0,
          created_at DATETIME DEFAULT GETDATE(),
          updated_at DATETIME DEFAULT GETDATE()
        )
      END
    `;
        await query(sqlQuery);
    }
}

module.exports = Task;
