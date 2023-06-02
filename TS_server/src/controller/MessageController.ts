import { MessageModel } from './../models/MessageModel';
import { Request, Response } from "express";

export default class MessageController {
    static onGetMessageForUser() {
        return async (req: Request, res: Response) => {
            try {
                const result = await MessageModel.getMessageUser(req);
                return res.json(result);
            }
            catch (error) {
                res.status(500).json({ error: 'Внутренняя ошибка сервера' });
            }

        }
    }
    static onCreateMessage() {
        return async (req: Request, res: Response) => {
            try {
                if (!req.body) {
                    throw new Error("No message Information")
                } else {
                    const result = await MessageModel.createMessage(req);
                    return res.send(result);
                }
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
                res.status(500).json({ error: 'Внутренняя ошибка сервера' });
            }
        }
    }
 
}