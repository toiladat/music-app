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
exports.requireAuth = exports.userInfor = void 0;
const user_models_1 = __importDefault(require("../../models/user.models"));
const userInfor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.cookies.token;
    const user = yield user_models_1.default.findOne({
        token: tokenUser,
        deleted: false
    });
    if (user) {
        res.locals.user = user;
    }
    next();
});
exports.userInfor = userInfor;
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.cookies.token;
    if (!tokenUser) {
        res.json({
            code: 401
        });
        return;
    }
    const user = yield user_models_1.default.findOne({
        token: tokenUser,
        deleted: false
    });
    if (!user) {
        res.json({
            code: 401
        });
        return;
    }
    res.locals.user = user;
    next();
});
exports.requireAuth = requireAuth;
