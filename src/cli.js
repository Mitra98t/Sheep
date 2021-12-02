const { Error } = require('./errorChecker')
const { Lexer } = require('./lexer')
const { Runner } = require('./runner')

import arg from "arg"

function parseArgs(rawArgs) {
    const args = arg(
        {
            "--sheep": Boolean,
            "-s": "--sheep",
        },
        {
            argv: rawArgs.slice(2)
        }
    )


    return {
        "file": args._[0],
        "sheep": !!args['--sheep']
    }

}

export function cli(args) {
    let parsedArgs = parseArgs(args)

    if (!parsedArgs.file) {
        console.log("Missing file to run\nTry something like: sheep test.wool")
        return
    }

    if (parsedArgs.file.split('.')[1] != "wool") {
        console.log("incorrect file extention")
        return
    }
    let lex = new Lexer(parsedArgs.file)
    lex.parseProgram()
    if (lex.parsedProgram instanceof Error)
        console.log(lex.fancyPrint())
    else {
        let runner = new Runner(lex.parsedProgram)
        runner.run()
    }
    return
}