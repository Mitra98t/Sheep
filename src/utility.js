const Utils = {
    "tokens": {
        add: "ADD",
        sub: "SUB",
        mul: "MUL",
        div: "DIV",
        wmm: "WMM",
        rmm: "RMM",
        pus: "PUS",
        pop: "POP",
        cmp: "CMP",
        cbr: "CBR",
        sdo: "SDO",
        sdi: "SDI",
    },
    "regex": {
        clear: /[^bBeE#]+/gm,
        number: /^B[e|E]+$/gm,
        operation: {
            aritmetic: /^[b|B]eee|[b|B]eeE$/gm,
            memory: /^[b|B]EEE$/gm,
            stack: /^[b|B]BBB$/gm,
            stdIO: /^[e|E]EEE$/gm,
            utility: /^[b|B]EeE$/gm,
        },
    }
}

exports.Utils = Utils