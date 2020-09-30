import commander from "commander";
import prompts from "prompts";
import {DataObserver} from "./FileObserver";
import {execSync} from "child_process";
import {mkdirSync, writeFile} from "fs";
import chalk from "chalk";
import figlet from "figlet";
import * as blog from "cli-block"
export class ProgramControl{

    public static init(){
        commander
            .version('0.0.1')
            .option("-jo ","ding dong")
            .description("An example CLI With Typescript")
            .parse(process.argv)
    }

    public static showPrompt(){
        DataObserver.of(prompts({
            type: 'text',
            name: 'value',
            message: 'palim palim?',
        })).onChange(value => {
            if(commander.jo){
                console.log("jooo jo jooo WAS GEEEEEEHT ?!")
            }
            console.log(chalk.green("ich hätte gerne eine flasche ")  +chalk.underline(value.value))
            console.log("normal " + chalk.bold("fett") + chalk.dim("dünner")+ " " + chalk.italic("italic"))
            const t: Buffer = execSync("java -version");
            //mkdirSync("hello")
            //writeFile("hello.txt","sdfsf",err => console.error(err))
            //console.log(t.toString())
            console.log(chalk.rgb(255,113,206)(figlet.textSync("Hello baby","JS Block Letters")))
            console.log(chalk.rgb(185,103,255)(figlet.textSync("Hello baby",{
                font:"SL Script"})))
            console.log(chalk.rgb(1,205,254)(figlet.textSync("Hello baby","Invita")))
            console.log(chalk.rgb(5,255,161)(figlet.textSync("Hello baby","AMC Thin")))
            console.log(chalk.rgb(255,251,150)(figlet.textSync("Hello baby")))
            // prompts( {
            //     type: 'multiselect',
            //     name: 'color',
            //     message: 'Pick colors',
            //     choices: [
            //         { title: 'Red', value: '#ff0000' },
            //         { title: 'Green', value: '#00ff00' },
            //         { title: 'Blue', value: '#0000ff' }
            //     ]}).then(value1 => console.log("bazinga"))

            console.log(chalk.reset())
            blog.BLOCK_START("hshsdfhsf")
            blog.BLOCK_LINE("shdhfs")
            chalk.rgb(255,251,150)(figlet.textSync("Hello baby")).split("\n").forEach(value1 => {
                blog.BLOCK_LINE(value1)
            })
            blog.BLOCK_LINE("shdhfs")
            blog.BLOCK_LINE("shdhfs")
            blog.BLOCK_END();
        })
    }
}
