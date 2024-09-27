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
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const topics_models_1 = __importDefault(require("../../models/topics.models"));
const system_1 = require("../../config/system");
const prefixAdmin = system_1.systemConfig.prefixAdmin;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield songs_model_1.default.find({
        deleted: false,
        status: 'active'
    });
    res.render('admin/page/songs/index.pug', {
        pageTitle: "Danh sách bài hát",
        songs: songs
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singers = yield singer_model_1.default.find({
        deleted: false,
        status: 'active'
    }).select('fullName');
    const topics = yield topics_models_1.default.find({
        deleted: false,
        status: 'active'
    }).select('title');
    res.render('admin/page/songs/create', {
        pageTitle: 'Tạo mới bài hát',
        singers: singers,
        topics: topics
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body['avatar']) {
        req.body['avatar'] = req.body['avatar'][0];
    }
    if (req.body['audio']) {
        req.body['audio'] = req.body['audio'][0];
    }
    const newSong = new songs_model_1.default(req.body);
    yield newSong.save();
    res.redirect(`/${prefixAdmin}/songs`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const song = yield songs_model_1.default.findOne({
            _id: id,
            deleted: false,
            status: 'active'
        });
        const singers = yield singer_model_1.default.find({
            status: 'active',
            deleted: false
        }).select('fullName');
        const topics = yield topics_models_1.default.find({
            deleted: false,
            status: 'active'
        }).select('title');
        res.render('admin/page/songs/edit.pug', {
            pageTitle: "Chỉnh sửa bài hát",
            song: song,
            singers: singers,
            topics: topics
        });
    }
    catch (_a) {
        res.redirect('back');
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (req.body.avatar) {
            req.body.avatar = req.body.avatar[0];
        }
        if (req.body.audio) {
            req.body.audio = req.body.audio[0];
        }
        yield songs_model_1.default.updateOne({
            _id: id,
            deleted: false,
            status: 'active'
        }, req.body);
        res.redirect('back');
    }
    catch (_a) {
        res.redirect('back');
    }
});
exports.editPatch = editPatch;
