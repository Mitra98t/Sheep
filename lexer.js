const fs = require('fs')

const regex = {
    clear: /[^bBeE#]+/gm,
    operation: {
        aritmetic: /^[b|B]eee|[b|B]eeE$/gm,
        memory: /^[b|B]EEE$/gm,
        stack: /^[b|B]BBB$/gm,
        utility: /^[b|B]EeE$/gm,
    }

}

class Lexer {
    constructor(fileName) {
        this.program = fs.readFileSync(fileName, 'utf8').split("\n")
        this.program = this.program.map((l) => l.replace(regex.clear, ''))
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
                this.parsedProgram.push(parsedLine)
                this.advance()
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
        if (op.match(regex.operation.aritmetic))
            return this.artimeticParse()
        if (op.match(regex.operation.memory))
            return this.memoryParse()
        if (op.match(regex.operation.stack))
            return this.stackParse()
        if (op.match(regex.operation.utility))
            return this.utilityParse()
    }

    artimeticParse() {
        let res = { token: "", args: [] }
        let line = this.program[this.curInst]
        let op = line.substring(0, 4)
        let args = line.substr(4).split("#")
        args.shift()
        res.args = args
        switch (op) {
            case 'Beee':
                res.token = "ADD"
                break
            case 'beee':
                res.token = "SUB"
                break
            case 'BeeE':
                res.token = "MUL"
                break
            case 'beeE':
                res.token = "DIV"
                break

            default:
                break
        }

        return res
    }

    memoryParse() {
        let res = { token: "", args: [] }
        let line = this.program[this.curInst]
        let op = line.substring(0, 4)
        let args = line.substr(4).split("#")
        args.shift()
        res.args = args
        switch (op) {
            case 'BEEE':
                res.token = "WMM"
                break
            case 'bEEE':
                res.token = "RMM"
                break

            default:
                break
        }

        return res
    }

    stackParse() {
        let res = { token: "", args: [] }
        let line = this.program[this.curInst]
        let op = line.substring(0, 4)
        let args = line.substr(4).split("#")
        args.shift()
        res.args = args
        switch (op) {
            case 'BBBB':
                res.token = "PUS"
                break
            case 'bBBB':
                res.token = "POP"
                break

            default:
                break
        }

        return res
    }

    utilityParse() {
        let res = { token: "", args: null }
        let line = this.program[this.curInst]
        let op = line.substring(0, 4)
        let args = line.substr(4).split("#")
        args.shift()
        res.args = args
        switch (op) {
            case 'BEeE':
                res.token = "CMP"
                break
            case 'BEeE':
                res.token = "CBR"
                break
            case 'EEEE':
                res.token = "CBR"
                break

            default:
                break
        }

        return res
    }

    fancyPrint() {
        let res = ""

        for (let i = 0; i < this.parsedProgram.length; i++) {
            res += "TOKEN: " + this.parsedProgram[i].token + " | ARGS: "
            for (let j = 0; j < this.parsedProgram[i].args.length; j++) {
                res += this.parsedProgram[i].args[j] + ", "
            }
            res += "\n"
        }
        return res
    }
}

module.exports = { Lexer }