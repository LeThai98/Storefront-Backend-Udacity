"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateTokenByUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.TOKEN_KEY;
const generateTokenByUser = (data) => {
    return jsonwebtoken_1.default.sign(data, process.env.TOKEN_KEY, { expiresIn: '2h' });
};
exports.generateTokenByUser = generateTokenByUser;
const verifyToken = (req, res, next) => {
    var _a;
    if (!req.headers.authorization) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        jsonwebtoken_1.default.verify(token, SECRET);
        next();
    }
    catch (error) {
        return res.status(401).json('Access denied, invalid token');
    }
};
exports.verifyToken = verifyToken;
