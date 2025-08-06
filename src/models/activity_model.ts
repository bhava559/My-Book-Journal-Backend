import mongoose from 'mongoose';

// Sub-schema for reading sessions
const readingSessionSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  completedPages: { type: Number }
});

// Activity schema
const activitySchema = new mongoose.Schema({
  userId: { type: String },
  bookId: { type: String },
  date: { type: Date },
  readingSessions: { type: [readingSessionSchema], default: [] },
});

// Unique constraint on userId + bookId + date
activitySchema.index({ userId: 1, bookId: 1, date: 1 }, { unique: true });

// Base model
export const ActivityBaseModel = mongoose.model('Activity', activitySchema);

// Interface for activity input
export interface IActivity {
  completedPages: number;
  userId: string;
  bookId: string;
  date: string; // received as ISO string
  readingSessions?: { time: Date; completedPages: number }[];
}

export class ActivityModel {
  static async dbInsertOrUpdate(activity: IActivity) {
    // Convert string to Date object
    const inputDate = new Date(activity.date);

    // Truncate to remove time part (for daily uniqueness)
    const truncatedDate = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      inputDate.getDate()
    );

    return ActivityBaseModel.findOneAndUpdate(
      {
        userId: activity.userId,
        bookId: activity.bookId,
        date: truncatedDate
      },
      {
        $push: {
          readingSessions: {
            time: new Date(inputDate.getTime() + (5.5 * 60 * 60 * 1000)), // IST = UTC + 5:30
            completedPages: activity.completedPages
          }
        }
      },
      { upsert: true, new: true }
    ).lean();
  }

//   static async dbGetByUserAndBook(userId: string, bookId: string) {
//   if (!userId || !bookId) return [];

//   const result = await ActivityBaseModel.find({ userId, bookId })
//     .sort({ date: 1 })
//     .lean();

//   return result || [];
// }

static async dbGetByUserAndBook(userId: string, bookId: string) {
  const activityArray = await ActivityBaseModel.find({ userId, bookId }).lean();

  // Ensure readingSessions is always an array
  const cleanArray = activityArray.map((activity) => {
    return {
      ...activity,
      readingSessions: Array.isArray(activity.readingSessions)
        ? activity.readingSessions
        : [],
    };
  });

  return cleanArray;
}

static async dbGetByUser(userId: string) {
  if (!userId) return [];

  const result = await ActivityBaseModel.find({ userId })
    .sort({ bookId: 1, date: 1 })
    .lean();

  // Group by bookId
  const groupedByBook = result.reduce((acc, activity) => {
    const bookId = activity.bookId;
    if (!acc[bookId]) {
      acc[bookId] = [];
    }
    acc[bookId].push({
      ...activity,
      readingSessions: Array.isArray(activity.readingSessions)
        ? activity.readingSessions
        : [],
    });
    return acc;
  }, {});

  // Convert to array format
  return Object.entries(groupedByBook).map(([bookId, activities]) => ({
    bookId,
    readingActivities: activities,
  }));
}

}
