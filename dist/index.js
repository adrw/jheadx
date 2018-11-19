#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const utils_1 = require("./utils");
yargs
    .commandDir("commands")
    .demandCommand(1)
    .fail((msg, error) => {
    console.log(msg);
    console.log(error);
    const cmd = utils_1.jheadCmdFromArgs();
    utils_1.logInfo(`Now running: $ ${cmd}`);
    utils_1.runJheadCmd(cmd);
}).argv;
//# sourceMappingURL=index.js.map