const fs = require('fs')
const { Error } = require('./errorChecker')
const { Lexer } = require('./lexer')
const { Runner } = require('./runner')

let lex = new Lexer("fibonacci.wool")
lex.parseProgram()
if (lex.parsedProgram instanceof Error)
    console.log(lex.fancyPrint())
else {
    let runner = new Runner(lex.parsedProgram)
    runner.run()
}
