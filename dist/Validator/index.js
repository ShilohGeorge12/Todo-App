"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
function validateTodos(schema) {
    const Schema = joi_1.default.object({
        todo: joi_1.default.string().min(2).max(30).required(),
        completed: joi_1.default.boolean()
    });
    return Schema.validate(schema, { abortEarly: false });
}
;
exports.default = validateTodos;
