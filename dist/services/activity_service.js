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
exports.getActivity = exports.updateActivity = void 0;
const activity_model_1 = require("../models/activity_model");
const updateActivity = (activityData) => __awaiter(void 0, void 0, void 0, function* () {
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
    const activityObject = {
        userId: activityData.userId,
        bookId: activityData.bookId,
        date: dateObj.toISOString(),
        completedPages: activityData.completedPages,
        readingSessions: [
            {
                completedPages: activityData.completedPages,
                time: new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
            }
        ]
    };
    return yield activity_model_1.ActivityModel.dbInsertOrUpdate(activityObject);
});
exports.updateActivity = updateActivity;
const getActivity = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield activity_model_1.ActivityModel.dbGetByUserAndBook(userId, bookId);
});
exports.getActivity = getActivity;
