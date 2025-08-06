import { ActivityModel, IActivity } from '../models/activity_model';

export const updateActivity = async (activityData: {
  userId: string;
  bookId: string;
  date: string;
  completedPages: number;
}) => {
  if (!activityData.userId || !activityData.bookId) {
    throw new Error('userId and bookId are required');
  }

  if (!activityData.completedPages || activityData.completedPages <= 0) {
    throw new Error('completedPages must be a positive number');
  }

  const dateObj = new Date(activityData.date);
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid or missing date');
  }

  const activityObject: IActivity = {
    userId: activityData.userId,
    bookId: activityData.bookId,
    date: dateObj.toISOString(),
    completedPages: activityData.completedPages,
    readingSessions: [
      {
        completedPages: activityData.completedPages,
        time: new Date(dateObj.getTime() + (5.5 * 60 * 60 * 1000))
      }
    ]
  };

  return await ActivityModel.dbInsertOrUpdate(activityObject);
};

export const getActivity = async (userId: string, bookId: string) => {
  return await ActivityModel.dbGetByUserAndBook(userId, bookId);
};


export const getUserActivities = async (userId: string) => {
  if (!userId) {
    throw new Error('userId is required');
  }
  return await ActivityModel.dbGetByUser(userId);
};
