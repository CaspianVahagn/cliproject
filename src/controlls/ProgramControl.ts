import commander from "commander";
import prompts, {Answers, Choice} from "prompts";
import {DataObserver} from "./DataObserver";
import {execSync} from "child_process";
import {mkdir, mkdirSync, writeFile} from "fs";
import chalk from "chalk";
import figlet from "figlet";
import * as blog from "cli-block"
import ErrnoException = NodeJS.ErrnoException;
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
        const choices: Choice[] = [
            { title: 'Red', value: '#ff0000' },
            { title: 'Green', value: '#00ff00' },
            { title: 'Blue', value: '#0000ff' }
        ];
        const result = this.multiChoice("pick a color",choices);
        // result.onChange(value => {
        //     console.log("Picked color" + value);
        //
        //     console.log(this.execCMD("java -version").toString());
        // });

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

    public static demo():void{
        console.log(chalk.rgb(255, 113, 206)(figlet.textSync("Hello baby", "JS Block Letters")));
        console.log(chalk.rgb(185, 103, 255)(figlet.textSync("Hello baby", {
            font: "SL Script"
        })))
        console.log(chalk.rgb(1, 205, 254)(figlet.textSync("Hello baby", "Invita")));
        console.log(chalk.rgb(5, 255, 161)(figlet.textSync("Hello baby", "AMC Thin")));
        console.log(chalk.rgb(255, 251, 150)(figlet.textSync("Hello baby")));


        console.log(chalk.reset());
        blog.BLOCK_START("Dies ist eine Informatives ding");
        blog.BLOCK_LINE("Bla bla");
        chalk.rgb(255, 251, 150)(figlet.textSync("Hello baby")).split("\n").forEach(value1 => {
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
        console.log(chalk.green("ich hätte gerne eine flasche ") + chalk.underline(answer.value));
        console.log("------");
        console.log("normal " + chalk.bold("fett") + chalk.dim("dünner") + " " + chalk.italic("italic") + chalk.underline("unterstrichen"));
    }
}
