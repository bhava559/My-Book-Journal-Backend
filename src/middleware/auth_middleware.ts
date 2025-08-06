import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './verify_token';
import { UserModel } from '../models/user_model';
import { adminEmail } from '../config/myconfig';
import { createUser } from '../services/user_service';

export async function ioCheckAuth(req: Request, res: Response, next: NextFunction) {
  await verifyToken(req, res, async () => {
    const firebaseUser = (req as any).firebaseUser;
    console.log('✅ Firebase User:', firebaseUser);
    const firebaseEmail = firebaseUser.email;

    let user = await UserModel.dbFindOne(firebaseEmail);

    if (!user) {
      try {
        user = await createUser(firebaseUser);
      } catch (err) {
        console.error('❌ Error creating user from token:', err);
        return res.status(500).json({ success: false, message: 'Failed to create user' });
      }
    }

    if (!req.body) req.body = {}; // ← add this

    req.body.currentUser = user;

    next();
  });
}

export async function ioCheckAdmin(req: Request, res: Response, next: NextFunction) {
  await ioCheckAuth(req, res, () => {
    const currentUser = req.body.currentUser;

    if (currentUser.email !== adminEmail) {
      return res.status(403).json({ success: false, message: 'Admin access denied' });
    }

    next();
  });
}
