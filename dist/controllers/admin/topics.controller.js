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
exports.topics = void 0;
const topics_models_1 = __importDefault(require("../../models/topics.models"));
const topics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topics_models_1.default.find({
        deleted: false,
        status: 'active'
    }).select('title avatar slug status ');
    res.render('admin/page/topics/index', {
        pageTitle: "Quản lý chủ đề",
        topics: topics
    });
});
exports.topics = topics;
