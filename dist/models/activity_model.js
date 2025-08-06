"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityModel = exports.ActivityBaseModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Sub-schema for reading sessions
const readingSessionSchema = new mongoose_1.default.Schema({
    time: { type: Date, default: Date.now },
    completedPages: { type: Number }
});
// Activity schema
const activitySchema = new mongoose_1.default.Schema({
    userId: { type: String },
    bookId: { type: String },
    date: { type: Date },
    readingSessions: { type: [readingSessionSchema], default: [] },
});
// Unique constraint on userId + bookId + date
activitySchema.index({ userId: 1, bookId: 1, date: 1 }, { unique: true });
// Base model
exports.ActivityBaseModel = mongoose_1.default.model('Activity', activitySchema);
class ActivityModel {
    static dbInsertOrUpdate(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            // Convert string to Date object
            const inputDate = new Date(activity.date);
            // Truncate to remove time part (for daily uniqueness)
            const truncatedDate = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
            return exports.ActivityBaseModel.findOneAndUpdate({
                userId: activity.userId,
                bookId: activity.bookId,
                date: truncatedDate
            }, {
                $push: {
                    readingSessions: {
                        time: new Date(inputDate.getTime() + (5.5 * 60 * 60 * 1000)), // IST = UTC + 5:30
                        completedPages: activity.completedPages
                    }
                }
            }, { upsert: true, new: true }).lean();
        });
    }
    //   static async dbGetByUserAndBook(userId: string, bookId: string) {
    //   if (!userId || !bookId) return [];
    //   const result = await ActivityBaseModel.find({ userId, bookId })
    //     .sort({ date: 1 })
    //     .lean();
    //   return result || [];
    // }
    static dbGetByUserAndBook(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityArray = yield exports.ActivityBaseModel.find({ userId, bookId }).lean();
            // Ensure readingSessions is always an array
            const cleanArray = activityArray.map((activity) => {
                return Object.assign(Object.assign({}, activity), { readingSessions: Array.isArray(activity.readingSessions)
                        ? activity.readingSessions
                        : [] });
            });
            return cleanArray;
        });
    }
}
exports.ActivityModel = ActivityModel;
