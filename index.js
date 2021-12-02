const fs = require('fs')
const { Lexer } = require('./lexer')

let lex = new Lexer("test.wool")
lex.parseProgram()
console.log(lex.fancyPrint())
