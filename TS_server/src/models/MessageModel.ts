import { Request } from "express";

const db = require("../db");

export class MessageModel {
  static async getMessageUser(req: Request): Promise<any[]> {
    const { id } = req.params;

    const result = await db.query(
      `SELECT * FROM messages WHERE "senderId" = 1 AND "receiverId" = $1`,
      [id]
    );
    return result.rows;
  }

  static async createMessage(req: Request): Promise<any> {
    const { senderId, receiverId, text, date } = req.body;
    const result = await db.query(
      'INSERT INTO messages ("senderId", "receiverId", text, date ) VALUES ($1, $2, $3, $4) RETURNING *',
      [senderId, receiverId, text, date]
    );
    return result.rows;
  }
  
}
