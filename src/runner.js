const { Utils } = require("./utility")
const readline = require("readline");
const { exit } = require("process");


class Runner {
    constructor(programTokens) {
        this.pTokens = programTokens
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    run() {
        let currTok
        let currIdx = 0

        let sheepVM = {
            stack: [],
            memory: [],
            flags: {
                eq: false,
                gt: false,
                ge: false,
            },
        }

        while (currIdx < this.pTokens.length) {
            currTok = this.pTokens[currIdx]
            if (currTok.args.length > 0) {
                currTok.args = this.transpileNums(currTok.args)
            }
            switch (currTok.token) {
                case Utils.tokens.wmm:
                    sheepVM.memory[currTok.args[0]] = currTok.args[1]
                    break;
                case Utils.tokens.rmm:
                    sheepVM.memory[currTok.args[0]] = sheepVM.memory[currTok.args[1]]
                    break;
                case Utils.tokens.pus:
                    sheepVM.stack.push(sheepVM.memory[currTok.args[0]])
                    break;
                case Utils.tokens.pop:
                    sheepVM.memory[currTok.args[0]] = sheepVM.stack.pop()
                    break;

                case Utils.tokens.cmp:
                    sheepVM.flags = this.cmpFunc(currTok, sheepVM.memory)
                    break;
                case Utils.tokens.cbr:
                    currIdx = this.cbrFunc(sheepVM.flags, currTok.args[0], currIdx, currTok.args[1]) - 1
                    break;

                case Utils.tokens.sdo:
                    this.sdoFunc(currTok, sheepVM.memory)
                    break;
                case Utils.tokens.sdi:
                    this.rl.question("", ans => {
                        sheepVM.memory[currTok.args[0]] = (ans)
                    })
                    break;

                case Utils.tokens.add:
                    sheepVM.memory[currTok.args[0]] = sheepVM.memory[currTok.args[0]] + sheepVM.memory[currTok.args[1]]
                    break;
                case Utils.tokens.sub:
                    sheepVM.memory[currTok.args[0]] = sheepVM.memory[currTok.args[0]] - sheepVM.memory[currTok.args[1]]
                    break;
                case Utils.tokens.mul:
                    sheepVM.memory[currTok.args[0]] = sheepVM.memory[currTok.args[0]] * sheepVM.memory[currTok.args[1]]
                    break;
                case Utils.tokens.div:
                    sheepVM.memory[currTok.args[0]] = sheepVM.memory[currTok.args[0]] / sheepVM.memory[currTok.args[1]]
                    break;

                default:
                    // throw err
                    break;
            }
            currIdx++
        }
        exit(0)
    }

    transpileNums(nums) {
        if (typeof (nums[0]) == "string") {
            let res = []
            for (const n of nums) {
                let num = ""
                if (n == "B") num += 0

                for (let i = 1; i < n.length; i++) {
                    if (n[i] == "E") num += 1
                    else if (n[i] == "e") num += 0
                }
                res.push(parseInt(num, 2))
            }
            return res
        }
        else return nums
    }

    cmpFunc(currTok, mem) {
        let res = {
            eq: false,
            gt: false,
            ge: false,
        }

        if (mem[currTok.args[0]] == mem[currTok.args[1]]) res.eq = true
        if (mem[currTok.args[0]] > mem[currTok.args[1]]) res.gt = true
        if (mem[currTok.args[0]] >= mem[currTok.args[1]]) res.ge = true

        return res
    }

    cbrFunc(flags, condition, currIdx, target) {
        let nextInstr = currIdx + 1
        switch (condition) {
            case 0:
                nextInstr = this.findInstruction(target - 1)
                break;
            case 1:
                if (flags.eq) nextInstr = this.findInstruction(target - 1)
                break;
            case 2:
                if (!flags.eq) nextInstr = this.findInstruction(target - 1)
                break;
            case 3:
                if (flags.gt) nextInstr = this.findInstruction(target - 1)
                break;
            case 4:
                if (!flags.gt) nextInstr = this.findInstruction(target - 1)
                break;
            case 5:
                if (flags.ge) nextInstr = this.findInstruction(target - 1)
                break;

            case 6:
                if (!flags.ge) nextInstr = this.findInstruction(target - 1)
                break;

            default:
                break;
        }

        return nextInstr
    }

    sdoFunc(currTok, mem) {
        if (currTok.args[0] == 0) process.stdout.write(mem[currTok.args[1]])
        else if (currTok.args[0] == 1) process.stdout.write(String.fromCharCode(mem[currTok.args[1]]))
        else if (currTok.args[0] == 2) process.stdout.write(mem[currTok.args[1]] + "\n")
        else if (currTok.args[0] == 3) process.stdout.write(String.fromCharCode(mem[currTok.args[1]]) + "\n")
    }

    findInstruction(lineNum) {
        for (let i = 0; i < this.pTokens.length; i++) {
            if (this.pTokens[i].lineNum == lineNum)
                return i
        }
        return -1
    }
}

module.exports = { Runner }