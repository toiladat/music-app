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
exports.listen = exports.search = exports.favorite = exports.favoritePatch = exports.like = exports.detail = exports.index = void 0;
const unidecode_1 = __importDefault(require("unidecode"));
const topics_models_1 = __importDefault(require("../../models/topics.models"));
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const user_models_1 = __importDefault(require("../../models/user.models"));
const favorite_song_models_1 = __importDefault(require("../../models/favorite-song.models"));
const moment_1 = __importDefault(require("moment"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slugTopic;
        const topic = yield topics_models_1.default.findOne({
            slug: slug,
            deleted: false,
            status: 'active'
        });
        const idTopic = topic["_id"];
        const songs = yield songs_model_1.default.find({
            topicId: idTopic,
            deleted: false,
            status: 'active'
        });
        for (const song of songs) {
            const singerData = yield singer_model_1.default.findOne({
                _id: song.singerId,
                status: 'active',
                deleted: false
            }).select('fullName');
            song["singerFullName"] = singerData.fullName;
        }
        res.render("client/page/songs/list", {
            pageTitle: "Danh sách bài hát",
            songs: songs
        });
    }
    catch (_a) {
        res.send('Not Found');
    }
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugSong = req.params.slugSong;
        const user = res.locals.user;
        const song = yield songs_model_1.default.findOne({
            slug: slugSong,
            status: 'active',
            deleted: false
        });
        song['lyricsFormat'] = song.lyrics.replace(/\[\d{2}:\d{2}\.\d{2}\]/g, '');
        song['createdAtFormat'] = (0, moment_1.default)(song.createdAt).format("DD/MM/YYYY");
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        }).select("fullName");
        const topic = yield topics_models_1.default.findOne({
            _id: song.topicId,
            deleted: false,
            status: 'active'
        }).select('title');
        const status = {
            like: '',
            favorite: ''
        };
        if (user) {
            const likedSong = yield user_models_1.default.findOne({
                _id: user._id,
                likedSongList: song.id
            });
            if (likedSong) {
                status['like'] = 'active';
            }
            const favoriteSong = yield favorite_song_models_1.default.findOne({
                userId: user._id,
                songList: song.id
            });
            if (favoriteSong) {
                status['favorite'] = 'active';
            }
        }
        res.render('client/page/songs/detail.pug', {
            pageTitle: "Chi tiết bài hát",
            song: song,
            topic: topic,
            singer: singer,
            status: status
        });
    }
    catch (_a) {
        res.send("Có lỗi xảy ra");
    }
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const { id, type } = req.body;
        const song = yield songs_model_1.default.findOne({
            _id: id,
            status: 'active',
            deleted: false
        });
        const currentLike = song.like;
        let updateLike = 0;
        let status = '';
        const existSongInList = yield user_models_1.default.findOne({
            _id: user._id,
            likedSongList: id
        });
        if (existSongInList) {
            yield user_models_1.default.updateOne({
                _id: user._id
            }, {
                $pull: {
                    likedSongList: id
                }
            });
            updateLike = currentLike - 1;
            status = 'unliked';
        }
        else {
            yield user_models_1.default.updateOne({
                _id: user._id
            }, {
                $push: {
                    likedSongList: id
                }
            });
            updateLike = currentLike + 1;
            status = 'liked';
        }
        yield songs_model_1.default.updateOne({
            _id: id,
            status: 'active',
            deleted: false
        }, {
            like: updateLike
        });
        res.json({
            code: 200,
            message: "iu iu iu ",
            updateLike: updateLike,
            status: status
        });
    }
    catch (_a) {
        res.json({
            code: 400
        });
    }
});
exports.like = like;
const favoritePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const user = res.locals.user;
        const existSongInList = yield favorite_song_models_1.default.findOne({
            userId: user._id,
            songList: id
        });
        let status = '';
        if (existSongInList) {
            yield favorite_song_models_1.default.updateOne({
                userId: user._id
            }, {
                $pull: {
                    songList: id
                }
            });
            status = 'unFavorite';
        }
        else {
            yield favorite_song_models_1.default.updateOne({
                userId: user._id
            }, {
                $push: {
                    songList: id
                }
            });
            status = 'favorite';
        }
        res.json({
            code: 200,
            message: "iu iu iu",
            status: status
        });
    }
    catch (_a) {
        res.json({
            code: 400,
            message: "Có lỗi xảy ra..",
        });
    }
});
exports.favoritePatch = favoritePatch;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const songs = [];
        const result = yield favorite_song_models_1.default.findOne({
            userId: user._id
        });
        const ids = result.songList;
        for (const id of ids) {
            const inforSong = yield songs_model_1.default.findOne({
                _id: id
            }).select('title avatar singerId  slug');
            const inforSinger = yield singer_model_1.default.findOne({
                _id: inforSong.singerId
            }).select('fullName');
            const song = {
                infoSong: inforSong,
                infoSinger: inforSinger
            };
            songs.push(song);
        }
        res.render('client/page/songs/favorite', {
            pageTitle: 'Bài hát yêu thích',
            songs: songs
        });
    }
    catch (_a) {
        res.redirect('back');
    }
});
exports.favorite = favorite;
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.params.type;
    let keyword = `${req.query.keyword}`.trim();
    let keywordSlug = keyword.replace(/\s/g, "-");
    keywordSlug = keywordSlug.replace(/-+/g, '-').toLowerCase();
    keywordSlug = (0, unidecode_1.default)(keywordSlug);
    const songs = [];
    const regexSlug = new RegExp(keywordSlug, 'i');
    const regex = new RegExp(keyword, 'i');
    const listSong = yield songs_model_1.default.find({
        $or: [
            { title: regex },
            { slug: regexSlug }
        ],
        deleted: false,
        status: 'active'
    }).select('title avatar singerId like  slug');
    for (const _song of listSong) {
        const inforSinger = yield singer_model_1.default.findOne({
            _id: _song.singerId
        }).select('fullName');
        const song = {
            slug: _song.slug,
            avatar: _song.avatar,
            title: _song.title,
            like: _song.like,
            singerFullName: inforSinger.fullName
        };
        songs.push(song);
    }
    if (type == 'result') {
        res.render('client/page/songs/list.pug', {
            pageTitle: `Bài hát yêu thích`,
            keyword: keyword,
            songs: songs
        });
    }
    else if (type == 'suggest') {
        res.json({
            code: 200,
            songs: songs
        });
    }
    else {
        res.json({
            code: 400
        });
    }
});
exports.search = search;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const song = yield songs_model_1.default.findOne({
            _id: id
        });
        const updateNumber = song.listen + 1;
        yield songs_model_1.default.updateOne({
            _id: id
        }, {
            listen: updateNumber
        });
        res.json({
            code: 200,
            listen: updateNumber
        });
    }
    catch (_a) {
        res.json({
            code: 400
        });
    }
});
exports.listen = listen;
