"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function Validate(req, res, next) {
    const key = req.headers['x-api-key'];
    const domain = req.headers.origin;
    // console.log( key, domain )
    if (key === `${process.env.valid_Key}`) {
        next();
    }
    else {
        res.status(403).json({ error: 'You are Not Allowed!!' });
    }
}
;
// `${process.env.valid_domain}` === domain 
// &&
exports.default = Validate;
