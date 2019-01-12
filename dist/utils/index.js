"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emoji = require("node-emoji");
const chalk_1 = require("chalk");
const child_process_1 = require("child_process");
const yargs = require("yargs");
exports.log = console.log;
exports.logError = (s) => exports.log(emoji.emojify(chalk_1.default.bold.red(s)));
exports.logInfo = (s) => exports.log(emoji.emojify(chalk_1.default.bold(s)));
exports.logDetail = (s) => exports.log(emoji.emojify(chalk_1.default.dim(s)));
exports.dateFormat = "YYYY-MM-DD HH:mm:ss:SSS";
exports.jheadCmdFromArgs = () => {
    let args = process.argv;
    args.splice(0, 1);
    args[0] = "jhead";
    return args.join(" ");
};
exports.runJheadCmd = (cmd) => {
    try {
        const result = child_process_1.execSync(cmd, { stdio: "pipe", encoding: "utf-8" });
        console.log(result);
    }
    catch (e) {
        console.log(e.stdout);
        console.log(e.stderr);
    }
};
exports.handleFail = () => {
    console.log(yargs.help().version());
    // const cmd = jheadCmdFromArgs()
    // logInfo(`Now running: $ ${cmd}`)
    // runJheadCmd(cmd)
};
//# sourceMappingURL=index.js.map