"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeClient = void 0;
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const user_route_1 = require("./user.route");
const auth_middlewares_1 = require("../../middlewares/client/auth.middlewares");
const routeClient = (app) => {
    app.use('/user', user_route_1.userRoute);
    app.use('/topics', auth_middlewares_1.userInfor, topic_route_1.routeTopic);
    app.use('/songs', auth_middlewares_1.userInfor, song_route_1.songRoute);
};
exports.routeClient = routeClient;
