"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const utils_1 = require("../utils");
exports.command = "extra";
exports.aliases = ["xtra", "-x"];
exports.desc = `See the extra commands available`;
function handler() {
    return __awaiter(this, void 0, void 0, function* () {
        utils_1.logInfo("extra");
        yargs.help().argv;
    });
}
exports.handler = handler;
//# sourceMappingURL=extra.js.map