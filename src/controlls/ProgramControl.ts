import commander from "commander";
import prompts, {Answers, Choice} from "prompts";
import {DataObserver} from "./DataObserver";
import {execSync} from "child_process";
import {mkdir, mkdirSync, writeFile} from "fs";
import chalk from "chalk";
import figlet from "figlet";
import * as blog from "cli-block"
import ErrnoException = NodeJS.ErrnoException;
import Timeout = NodeJS.Timeout;
import * as readline from 'readline'
import {publicDecrypt} from "crypto";
import {inspect} from "util";
export class ProgramControl {

    public static init() {
        commander
            .version('0.0.1')
            .option("-jo ", "ding dong")
            .description("An example CLI With Typescript")
            .parse(process.argv)
    }

    public  static async startProcess() {
        this.demo();
        await this.examplePrompt();
        // example for Progress
        await this.printProgressExample();
        const choices: Choice[] = [
            { title: 'Red', value: '#ff0000' },
            { title: 'Green', value: '#00ff00' },
            { title: 'Blue', value: '#0000ff' }
        ];
        const result = this.multiChoice("pick a color",choices);

    }

    public static help(){
        commander.outputHelp();
    }



    public static createDir(path: string): DataObserver<ErrnoException>{
        const observer = new DataObserver<ErrnoException>();
        mkdir(path,err => {
            if(err){
                observer.setValue(err);
            }
        });
        return observer;
    }

    public static writeFile(path: string,data:string): DataObserver<ErrnoException>{
        const observer = new DataObserver<ErrnoException>();
        writeFile(path,data,err => {
            if(err){
                observer.setValue(err);
            }
        });
        return observer;
    }

    public static execCMD(command: string): Buffer{
       return execSync(command);
    }

    public static multiChoice(question: string, choices: Choice[]){
        const p: Promise<Answers<string>> = prompts( {
            type: 'multiselect',
            name: 'value',
            message: 'Pick colors',
            choices: choices });

        p.then(value => console.log(value))

    }

    public static async printProgressExample(){
        const timeOutWrapper = { iv : null};
        let i = 0;

        return new Promise((resolve, reject) => {
            // @ts-ignore
            timeOutWrapper.iv = setInterval(() => {
                ProgramControl.logProcess(i, timeOutWrapper);
                i++;
                if(i>=100){
                    resolve(true);
                    // @ts-ignore
                    clearInterval(timeOutWrapper.iv);
                }
            },200 );
        })
    }

    public static logProcess(percent:number, timeout: any){
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write('\u2588');
        for (let i = 0; i < 100; i++){
            if(i < percent){
                process.stdout.write(chalk.hex(ColorsHex.GREEN)('\u25A0'));
            }else if(i === percent){
                process.stdout.write(chalk.hex(ColorsHex.GREEN)('\u25BA'));
            }else {
                process.stdout.write(' ');
            }

        }
        process.stdout.write('\u2588 ' + chalk.hex(ColorsHex.BLUE)(percent + "%"));
        if(percent >= 100){
            process.stdout.write('\n');
        }
    }

    public static demo():void{
        console.log(chalk.hex(ColorsHex.BLUE)(figlet.textSync("Hello baby", "JS Block Letters")));
        console.log(chalk.hex(ColorsHex.GREEN)(figlet.textSync("Hello baby", {
            font: "SL Script"
        })))
        console.log(chalk.hex(ColorsHex.YELLOW)(figlet.textSync("Hello baby", "Invita")));
        console.log(chalk.hex(ColorsHex.VIOLET)(figlet.textSync("Hello baby", "AMC Thin")));
        console.log(chalk.hex(ColorsHex.PINK)(figlet.textSync("Hello baby")));


        console.log(chalk.reset());
        blog.BLOCK_START("Dies ist eine Informatives ding");
        blog.BLOCK_LINE("Bla bla");
        chalk.hex(ColorsHex.ORANGE)(figlet.textSync("Hello baby")).split("\n").forEach(value1 => {
            blog.BLOCK_LINE(value1)
        });
        blog.BLOCK_LINE("Cooler Text");
        blog.BLOCK_LINE_SUCCESS("Erfolg");
        blog.BLOCK_LINE_ERROR("Error");
        blog.BLOCK_LINE_WARNING("Warnung");
        blog.BLOCK_END();
    }

     static async examplePrompt(){
        const answer = await prompts({
            type: 'text',
            name: 'value',
            message: 'palim palim?',
        });
        console.log("------");
        console.log(chalk.hex(ColorsHex.GREEN)("ich hätte gerne eine flasche ") + chalk.underline(answer.value));
        console.log("------");
        console.log("normal " + chalk.bold("fett ") + chalk.dim("dünner ") + " " + chalk.italic("italic ") + chalk.underline("unterstrichen"));
    }
}

export const ColorsHex ={
    PINK: '#ff71ce',
    VIOLET: '#b967ff',
    YELLOW: '#fffb96',
    GREEN: '#05ffa1',
    BLUE: '#01cdfe',
    ORANGE: '#ff9b83'
}
