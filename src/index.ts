#!/usr/bin/env node

import {ProgramControl} from "./controlls/ProgramControl";

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');

clear();
console.log(
    chalk.red(
        figlet.textSync('blaze-cli', { horizontalLayout: 'full' })
    )
);
console.log(
    chalk.red(
        "sfsfsdfsd"
    )
);
ProgramControl.init();
if (!process.argv.slice(2).length) {
    program.outputHelp();

}
ProgramControl.showPrompt();
