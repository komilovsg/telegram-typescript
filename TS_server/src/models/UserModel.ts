const db = require('../db')

export class UserModel {
    static async getContacts(): Promise<any[]> {
        const result = await db.query("SELECT * FROM contacts");
        return result.rows;
    }
   
    static async createUser(req: any): Promise<any> {
        const { login, password } = req.body;
    const result = await db.query(
      "INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *",
      [login, password]
    );
    return result.rows[0];
    }
    static async login(login: string, password: string): Promise<any> {
        const result = await db.query(
          "SELECT * FROM users WHERE login = $1 AND password = $2",
          [login, password]
        );
        return result
    }
}