const { Utils } = require("./utility");


class ErrorChecker {
    static lineCheck(lTok, lineNum, line) {
        switch (lTok.token) {
            case Utils.tokens.add:
            case Utils.tokens.sub:
            case Utils.tokens.mul:
            case Utils.tokens.div:
            case Utils.tokens.wmm:
            case Utils.tokens.rmm:
            case Utils.tokens.cmp:
            case Utils.tokens.cbr:
            case Utils.tokens.sdo:
                if (lTok.args.length != 2)
                    return new Error(++lineNum, line, "Missing Arguments")
                else
                    if (lTok.args.every((n => n[0].match(Utils.regex.number))))
                        return new Error(++lineNum, line, "Wrong Arguments")
                break;

            case Utils.tokens.pus:
            case Utils.tokens.pop:
            case Utils.tokens.sdi:
                if (lTok.args.length != 1)
                    return new Error(++lineNum, line, "Missing Arguments")
                else
                    if (lTok.args.every((n => n[0].match(Utils.regex.number))))
                        return new Error(++lineNum, line, "Wrong Arguments")
                break;
        }
        return null
    }
}

class Error {
    constructor(lineNum, line, title, desc = "") {
        this.lineNum = lineNum
        this.line = line
        this.title = title
        this.desc = desc
    }

    fancyPrint() {
        return `Error: ${this.title}\n${this.desc}${this.desc != "" ? "\n" : ""}At #${this.lineNum} line: ${this.line}`
    }
}

module.exports = { ErrorChecker, Error }