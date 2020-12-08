#!/usr/bin/env node

import {ProgramControl} from "./controlls/ProgramControl";
import chalk from "chalk";
import figlet from "figlet";
import os from 'os';


const clear = require('clear');
clear();
console.log(
    chalk.red(
        figlet.textSync('blaze-cli', { horizontalLayout: 'full' })
    )
);

// console.log(os.cpus());
// console.log(os.totalmem());
// console.log(os.freemem())

// Beginnt hier
ProgramControl.init();
if (!process.argv.slice(2).length) {
    ProgramControl.help();
}
ProgramControl.startProcess();
