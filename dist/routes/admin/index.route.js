"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeAdmin = void 0;
const dashboard_route_1 = require("./dashboard.route");
const songs_route_1 = require("./songs.route");
const upload_route_1 = require("./upload.route");
const system_1 = require("../../config/system");
const topcis_route_1 = require("./topcis.route");
system_1.systemConfig;
const routeAdmin = (app) => {
    const PATH = `/${system_1.systemConfig.prefixAdmin}`;
    app.use(`${PATH}/dashboard`, dashboard_route_1.dashboradRoute);
    app.use(`${PATH}/topics`, topcis_route_1.topicRoute);
    app.use(`${PATH}/songs`, songs_route_1.songsRoute);
    app.use(`${PATH}/upload`, upload_route_1.uploadRoute);
};
exports.routeAdmin = routeAdmin;
