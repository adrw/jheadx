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
const dayjs = require("dayjs");
exports.command = "fake";
exports.desc = `Fake Timestamps`;
function handler() {
    return __awaiter(this, void 0, void 0, function* () {
        var argv = yargs
            .option("s", {
            alias: "start",
            demandOption: true,
            describe: "start time",
            type: "string"
        })
            .option("f", {
            alias: "finish",
            demandOption: true,
            describe: "finish time",
            type: "string"
        }).argv;
        console.log("Fake Timestamps");
        console.log(argv.s, argv.f);
    });
}
exports.handler = handler;
//# sourceMappingURL=fake.js.map