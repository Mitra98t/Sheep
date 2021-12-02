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

| instruction | Argument1      | Argument2              | description                             |
| ----------- | -------------- | ---------------------- | --------------------------------------- |
| Beee        | mem1           | mem2                   | mem1 = mem1 + mem2                      |
| beee        | mem1           | mem2                   | mem1 = mem1 - mem2                      |
| BeeE        | mem1           | mem2                   | mem1 = mem1 * mem2                      |
| beeE        | mem1           | mem2                   | mem1 = mem1 / mem2                      |
| BEEE        | mem1           | num                    | mem1 = num                              |
| bEEE        | mem1           | mem2                   | mem1 = mem2                             |
| BBBB        | mem1           |                        | push mem1 on stack                      |
| bBBB        | mem1           |                        | pop from stack to mem1                  |
| BEeE        | mem1           | mem2                   | set flags comparing mem1 and mem2       |
| bEeE        | compering code | line number to jump to | jump to line number if comparation true |


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