"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_route_1 = require("./routes/client/index.route");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, database_1.connectDatabase)();
const express_flash_1 = __importDefault(require("express-flash"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const index_route_2 = require("./routes/admin/index.route");
const system_1 = require("./config/system");
const path_1 = __importDefault(require("path"));
app.use((0, cookie_parser_1.default)('fffs'));
app.use((0, express_session_1.default)({
    cookie: {
        maxAge: 50000
    }
}));
app.use((0, express_flash_1.default)());
app.use('/tinymce', express_1.default.static(path_1.default.join(__dirname, 'node_modules', 'tinymce')));
const method_override_1 = __importDefault(require("method-override"));
app.use((0, method_override_1.default)('_method'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static('public'));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.locals.prefixAdmin = system_1.systemConfig.prefixAdmin;
(0, index_route_1.routeClient)(app);
(0, index_route_2.routeAdmin)(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
