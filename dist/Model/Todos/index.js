"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TodoModel = (0, mongoose_1.model)('stores', new mongoose_1.Schema({
    todo: {
        type: String,
        minlength: 2,
        maxLenght: 100,
        required: true,
    },
    completed: {
        type: Boolean,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
}));
exports.default = TodoModel;
