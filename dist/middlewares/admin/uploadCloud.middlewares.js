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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFields = exports.uploadSingle = void 0;
const streamUpload_helper_1 = require("../../helper/streamUpload.helper");
const uploadSingle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req['file']) {
        const uploadToCloudinary = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, streamUpload_helper_1.streamUpload)(buffer);
            const fileNameUpLoad = req['file'].fieldname;
            req.body[fileNameUpLoad] = result['url'];
            next();
        });
        uploadToCloudinary(req['file'].buffer);
    }
    else {
        next();
    }
});
exports.uploadSingle = uploadSingle;
const uploadFields = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const key in req['files']) {
            req.body[key] = [];
            const array = req['files'][key];
            for (const item of array) {
                const result = yield (0, streamUpload_helper_1.streamUpload)(item.buffer);
                const url = result['url'];
                req.body[key].push(url);
            }
        }
        next();
    }
    catch (err) {
        console.log(err);
    }
});
exports.uploadFields = uploadFields;
