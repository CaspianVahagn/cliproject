#!/usr/bin/env node

import {ProgramControl} from "./controlls/ProgramControl";
import chalk from "chalk";
import figlet from "figlet";

const clear = require('clear');
clear();
console.log(
    chalk.red(
        figlet.textSync('blaze-cli', { horizontalLayout: 'full' })
    )
);
// Beginnt hier
ProgramControl.init();
if (!process.argv.slice(2).length) {
    ProgramControl.help();
}
ProgramControl.startProcess();
