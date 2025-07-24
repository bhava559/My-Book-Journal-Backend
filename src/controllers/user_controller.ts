import { Request, Response } from 'express';
import { UserModel } from '../models/user_model';
import { v4 as uuidv4 } from 'uuid';
import { createUser } from '../services/user_service';

export const ioCreateUser = async (req: Request, res: Response) => {
  try {
    const { email, name, image, token } = req.body;
    const result = await createUser({ email, name, image, token });
    res.json({ success: true, message: 'User created', data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating user' });
  }
};



  