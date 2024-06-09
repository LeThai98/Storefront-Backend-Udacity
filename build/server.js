"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const user_controllers_1 = __importDefault(require("./handlers/user_controllers"));
const product_controllers_1 = __importDefault(require("./handlers/product_controllers"));
const order_controllers_1 = __importDefault(require("./handlers/order_controllers"));
const app = (0, express_1.default)();
let port = 4200;
if (process.env.ENV === 'test') {
    port = 3001;
}
;
const corsOptions = {
    origin: `http://localhost:${port}`,
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../index.html'));
});
// APIs
(0, user_controllers_1.default)(app);
(0, product_controllers_1.default)(app);
(0, order_controllers_1.default)(app);
//Starting the Server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
// Export the app instance for use in other modules
exports.default = app;
