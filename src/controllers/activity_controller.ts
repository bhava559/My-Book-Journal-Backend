import { Request, Response } from 'express';
import { updateActivity, getActivity } from '../services/activity_service';
import { IActivity } from '../models/activity_model';

export class ActivityController {
  static async ioUpdateActivity(req: Request, res: Response) {
    try {
      const userId: string = req.body.userId;
      const bookId: string = req.body.bookId;
      const completedPages: number = req.body.completedPages;
      const date: string = req.body.date;

      if (!userId) {
        res.status(500).json({ success: false, message: 'UserId is null' });
        return;
      }

      if (!bookId) {
        res.status(500).json({ success: false, message: 'BookId is null' });
        return;
      }

      if (completedPages === undefined || completedPages < 0) {
        res.status(500).json({ success: false, message: 'Pages is invalid or null' });
        return;
      }

      if (!date) {
        res.status(500).json({ success: false, message: 'Date is null' });
        return;
      }

      const parsed = new Date(date);
      if (isNaN(parsed.getTime())) {
        res.status(500).json({ success: false, message: 'Invalid date format' });
        return;
      }

      const activityData: IActivity = {
        userId: userId,
        bookId: bookId,
        completedPages: completedPages,
        date: date, // ✅ pass as string
        readingSessions: []
      };

      const result = await updateActivity(activityData);
      res.json({ success: true, message: 'Activity updated', data: result });

    } catch (error) {
      res.status(500).json({ success: false, message: 'Activity update failed' });
    }
  }

  static async ioGetActivity(req: Request, res: Response) {
    try {
      const userId: string = req.body.userId;
      const bookId: string = req.body.bookId;

      if (!userId) {
        res.status(500).json({ success: false, message: 'UserId is null' });
        return;
      }

      if (!bookId) {
        res.status(500).json({ success: false, message: 'BookId is null' });
        return;
      }

      const result = await getActivity(userId, bookId);
      res.json({ success: true, data: result });

    } catch (error) {
      res.status(500).json({ success: false, message: 'Fetch failed' });
    }
  }
}
