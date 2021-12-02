const fs = require('fs')
const { ErrorChecker, Error } = require('./errorChecker')
const { Utils } = require('./utility')


class Lexer {
    constructor(fileName) {
        this.program = fs.readFileSync(fileName, 'utf8').split("\n")
        this.program = this.program.map((l) => l.replace(Utils.regex.clear, ''))
        this.curInst = 0
        this.parsedProgram = []
    }

    parseProgram() {
        let endOfFile = false
        do {
            let parsedLine = this.parseLine()
            if (parsedLine.hasOwnProperty("status")) {
                if (parsedLine.status == "end-program")
                    endOfFile = true

                if (parsedLine.status == "empty-instruction")
                    this.advance()
            }
            else {
                let er = ErrorChecker.lineCheck(parsedLine, this.curInst, this.program[this.curInst])
                if (er == null) {
                    this.parsedProgram.push(parsedLine)
                    this.advance()
                }
                else {
                    this.parsedProgram = er
                    return;
                }
            }
        } while (!endOfFile);
    }

    advance() {
        this.curInst += 1
    }

    parseLine() {
        if (this.curInst >= this.program.length) return { status: "end-program" }

        let line = this.program[this.curInst]
        if (line == "") return { status: "empty-instruction" }
        let op = line.substring(0, 4)
        if (op.match(Utils.regex.operation.aritmetic))
            return this.artimeticParse()
        else if (op.match(Utils.regex.operation.memory))
            return this.memoryParse()
        else if (op.match(Utils.regex.operation.stack))
            return this.stackParse()
        else if (op.match(Utils.regex.operation.utility))
            return this.utilityParse()
        else if (op.match(Utils.regex.operation.stdIO))
            return this.stdIOParse()
        else
            return null
    }

    artimeticParse() {
        let res = { lineNum: -1, token: "", args: [] }
        let line = this.program[this.curInst]
        let op = line.substring(0, 4)
        let args = line.substr(4).split("#")
        args.shift()
        res.args = args
        res.lineNum = this.curInst
        switch (op) {
            case 'Beee':
                res.token = Utils.tokens.add
                break
            case 'beee':
                res.token = Utils.tokens.sub
                break
            case 'BeeE':
                res.token = Utils.tokens.mul
                break
            case 'beeE':
                res.token = Utils.tokens.div
                break

            default:
                break
        }

        return res
    }

    memoryParse() {
        let res = { lineNum: -1, token: "", args: [] }
        let line = this.program[this.curInst]
        let op = line.substring(0, 4)
        let args = line.substr(4).split("#")
        args.shift()
        res.args = args
        res.lineNum = this.curInst
        switch (op) {
            case 'BEEE':
                res.token = Utils.tokens.wmm
                break
            case 'bEEE':
                res.token = Utils.tokens.rmm
                break

            default:
                break
        }

        return res
    }

    stackParse() {
        let res = { lineNum: -1, token: "", args: [] }
        let line = this.program[this.curInst]
        let op = line.substring(0, 4)
        let args = line.substr(4).split("#")
        args.shift()
        res.args = args
        res.lineNum = this.curInst
        switch (op) {
            case 'BBBB':
                res.token = Utils.tokens.pus
                break
            case 'bBBB':
                res.token = Utils.tokens.pop
                break

            default:
                break
        }

        return res
    }

    utilityParse() {
        let res = { lineNum: -1, token: "", args: [] }
        let line = this.program[this.curInst]
        let op = line.substring(0, 4)
        let args = line.substr(4).split("#")
        args.shift()
        res.args = args
        res.lineNum = this.curInst
        switch (op) {
            case 'BEeE':
                res.token = Utils.tokens.cmp
                break
            case 'bEeE':
                res.token = Utils.tokens.cbr
                break

            default:
                break
        }

        return res
    }

    stdIOParse() {
        let res = { lineNum: -1, token: "", args: [] }
        let line = this.program[this.curInst]
        let op = line.substring(0, 4)
        let args = line.substr(4).split("#")
        args.shift()
        res.args = args
        res.lineNum = this.curInst
        switch (op) {
            case 'EEEE':
                res.token = Utils.tokens.sdo
                break

            default:
                break
        }

        return res
    }

    fancyPrint() {
        let res = ""

        if (this.parsedProgram instanceof Error) {
            res += this.parsedProgram.fancyPrint()
        }
        else {
            for (let i = 0; i < this.parsedProgram.length; i++) {
                res += "LINE NUM: " + this.parsedProgram[i].lineNum + " | TOKEN: " + this.parsedProgram[i].token + " | ARGS: "
                for (let j = 0; j < this.parsedProgram[i].args.length; j++) {
                    res += this.parsedProgram[i].args[j] + (j == this.parsedProgram[i].args.length - 1 ? "" : ", ")
                }
                res += "\n"
            }
        }
        return res
    }
}

module.exports = { Lexer }