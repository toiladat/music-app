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
exports.logout = exports.registerPost = exports.register = exports.loginPost = exports.login = void 0;
const md5_1 = __importDefault(require("md5"));
const generate_helper_1 = require("../../helper/generate.helper");
const user_models_1 = __importDefault(require("../../models/user.models"));
const favorite_song_models_1 = __importDefault(require("../../models/favorite-song.models"));
const login = (req, res) => {
    res.render('client/page/user/login.pug', {
        pageTitle: "Đăng nhập"
    });
};
exports.login = login;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const account = yield user_models_1.default.findOne({
        email: email
    });
    if (!account) {
        req.flash("error", "email không tồn tại !");
        res.redirect('back');
        return;
    }
    const passType = (0, md5_1.default)(password);
    if (passType != account.password) {
        req.flash("error", "Mật khẩu không chính xác");
        res.redirect('back');
        return;
    }
    if (account.status == 'inactive') {
        req.flash("error", "Tài khoản đang bị khóa");
        res.redirect('back');
        return;
    }
    res.cookie('token', account.token, {
        expires: new Date(Date.now() + 8 * 3600000)
    });
    res.redirect('/topics');
});
exports.loginPost = loginPost;
const register = (req, res) => {
    res.render('client/page/user/register.pug', {
        pageTitle: 'Đăng ký'
    });
};
exports.register = register;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existUser = yield user_models_1.default.findOne({
        email: email
    });
    if (existUser) {
        req.flash('error', "Email đã tồn tại");
        res.redirect('back');
        return;
    }
    req.body.password = (0, md5_1.default)(req.body.password);
    req.body.token = (0, generate_helper_1.generateRandomString)(32);
    const newUser = new user_models_1.default(req.body);
    yield newUser.save();
    res.cookie('token', newUser.token, {
        expires: new Date(Date.now() + 8 * 3600000)
    });
    const newFavorite = new favorite_song_models_1.default({
        userId: newUser._id
    });
    yield newFavorite.save();
    res.redirect('/topics');
});
exports.registerPost = registerPost;
const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/topics');
};
exports.logout = logout;
