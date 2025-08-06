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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityController = void 0;
const activity_service_1 = require("../services/activity_service");
class ActivityController {
    static ioUpdateActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.userId;
                const bookId = req.body.bookId;
                const completedPages = req.body.completedPages;
                const date = req.body.date;
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
                const activityData = {
                    userId: userId,
                    bookId: bookId,
                    completedPages: completedPages,
                    date: date, // ✅ pass as string
                    readingSessions: []
                };
                const result = yield (0, activity_service_1.updateActivity)(activityData);
                res.json({ success: true, message: 'Activity updated', data: result });
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Activity update failed' });
            }
        });
    }
    static ioGetActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.userId;
                const bookId = req.body.bookId;
                if (!userId) {
                    res.status(500).json({ success: false, message: 'UserId is null' });
                    return;
                }
                if (!bookId) {
                    res.status(500).json({ success: false, message: 'BookId is null' });
                    return;
                }
                const result = yield (0, activity_service_1.getActivity)(userId, bookId);
                res.json({ success: true, data: result });
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Fetch failed' });
            }
        });
    }
}
exports.ActivityController = ActivityController;
