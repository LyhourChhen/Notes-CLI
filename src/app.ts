import * as yargs from "yargs"
import { addNote } from "./note"

yargs.version("1.0.0")

yargs.command({
    command: "add",
    describe: "Add note into App.",
    builder: {
        title: {
            describe: "Note's title",
            type: "string",
            demandOption: true
        },
        body: {
            describe: "Note's Body",
            type: "string",
            demandOption: true
        },
    },
    handler: ({ $0, _ }) => {
        // console.log("hi", argv)
        addNote($0, $0)
    }
})







console.log("render args", yargs.argv)