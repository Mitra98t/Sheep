# Sheep Language

## Grammar

```
<number> := #B<numVal>
<numVal> := E<numVal> | e<numVal> | nil

<instruction> := <prefix> <args>
<args> := <number> <args> | nil
<prefix> := <aritmetic> | <memory> | <stack> | <utility>

<artimetic> := Beee <number> <number> | beee <number> <number> | BeeE <number> <number> | beeE <number> <number>
<memory> := BEEE <number> <number> | bEEE <number> <number>
<stack> := BBBB <number> | bBBB <number>
<utility> := BEeE <number> <number> | bEeE <number> <number>
```

| instruction | Argument1      | Argument2              | code | description                             |
| ----------- | -------------- | ---------------------- | ---- | --------------------------------------- |
| Beee        | mem1           | mem2                   | ADD  | mem1 = mem1 + mem2                      |
| beee        | mem1           | mem2                   | SUB  | mem1 = mem1 - mem2                      |
| BeeE        | mem1           | mem2                   | MUL  | mem1 = mem1 * mem2                      |
| beeE        | mem1           | mem2                   | DIV  | mem1 = mem1 / mem2                      |
| BEEE        | mem1           | num                    | WMM  | mem1 = num                              |
| bEEE        | mem1           | mem2                   | RMM  | mem1 = mem2                             |
| BBBB        | mem1           |                        | PUS  | push mem1 on stack                      |
| bBBB        | mem1           |                        | POP  | pop from stack to mem1                  |
| BEeE        | mem1           | mem2                   | CMP  | set flags comparing mem1 and mem2       |
| bEeE        | compering code | line number to jump to | CBR  | jump to line number if comparation true |
| EEEE        | mem1           |                        | SDI  | Standard input to mem1                  |


## Instruction Set

### Aritmetic Procedures

- Addition
  - `Beee`
- Subtraction
  - `beee`
- Multiplication
  - `BeeE`
- Division
  - `beeE`

### Memory Procedures

- Write memory at ofset
  - `BEEE`
- Read memory at ofset
  - `bEEE`

### Stack Procedures

- push on stack
  - `BBBB`
- pop from stack
  - `bBBB`

### Utility instruction

- cmp
  - `BEeE`
- Conditioned Branch
  - `bEeE`


## Rappresentazione di numeri

```
<number> := #B<numVal>
<numVal> := E<numVal> | e<numVal> | nil
```

## Condition Codes

| condition    | decimal | binary | sheepcode        |
| ------------ | ------- | ------ | ---------------- |
| nothing      | 0       | 0      | B or B[e]+       |
| equal        | 1       | 1      | BE or B[e]+E     |
| not equal    | 2       | 10     | BEe or B[e]+Ee   |
| grater then  | 3       | 11     | BEE or B[e]+EE   |
| less equal   | 4       | 100    | BEee or B[e]+Eee |
| grater equal | 5       | 101    | BEeE or B[e]+EeE |
| less then    | 6       | 110    | BEEe or B[e]+EEe |
