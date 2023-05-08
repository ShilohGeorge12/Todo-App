"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const Routes_1 = __importDefault(require("./Routes"));
const Error_1 = require("./Middlewares/Error");
(0, dotenv_1.config)();
const App = (0, express_1.default)();
const port = process.env.PORT;
App.use((0, cors_1.default)());
App.use(express_1.default.json());
App.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
try {
    mongoose_1.default.set('strictQuery', false);
    mongoose_1.default.connect(`${process.env.DB_CONNECT}`);
}
catch (err) {
    console.log(err);
}
App.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public/index.html'));
});
App.use('/api', Routes_1.default);
App.use('*', Error_1.ErrorHandler);
App.listen(port, () => console.log('listening'));
