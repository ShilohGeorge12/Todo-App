"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("../Middlewares/Auth/index"));
const Error_1 = require("../Middlewares/Error");
const index_2 = __importDefault(require("../Model/Todos/index"));
const Validator_1 = __importDefault(require("../Validator"));
const Routes = (0, express_1.Router)();
Routes.get('/todos', index_1.default, (0, Error_1.ErrorBoundary)(async (req, res) => {
    const todos = await index_2.default.find().select('_id todo completed');
    res.status(200).json(todos);
}));
Routes.post('/todos', index_1.default, (0, Error_1.ErrorBoundary)(async (req, res) => {
    const { error } = (0, Validator_1.default)(req.body);
    if (error) {
        const errArr = [];
        error.details.map(err => errArr.push(err.message));
        res.status(400).json({ error: errArr });
    }
    else {
        const newTodo = await index_2.default.create({
            todo: req.body.todo,
            completed: false,
        });
        await newTodo.save();
        res.status(200).json(newTodo);
    }
}));
Routes.put('/todos/:id', index_1.default, (0, Error_1.ErrorBoundary)(async (req, res) => {
    const { error } = (0, Validator_1.default)(req.body);
    const updateTodo = await index_2.default.findOne({ _id: req.params.id }).select('_id todo completed');
    if (error) {
        const errArr = [];
        error.details.map(err => errArr.push(err.message));
        res.status(400).json({ error: errArr });
    }
    else if (updateTodo) {
        updateTodo.todo = await req.body.todo;
        updateTodo.completed = await req.body.completed;
        await updateTodo.save();
        const result = await updateTodo;
        console.log(result);
        res.status(200).json(result);
    }
    else {
        res.status(404).json({ error: 'Todo Not Found!' });
    }
}));
Routes.delete('/todos/:id', index_1.default, (0, Error_1.ErrorBoundary)(async (req, res) => {
    const isTodo = await index_2.default.exists({ _id: req.params.id });
    if (isTodo) {
        const deleteTodo = await index_2.default.findByIdAndRemove({ _id: req.params.id });
        res.status(200).json({ message: 'Project deleted!' });
    }
    else {
        res.status(404).json({ error: 'Project Not Found' });
    }
}));
exports.default = Routes;
