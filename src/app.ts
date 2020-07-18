import * as yargs from "yargs";
import { createNote, readNote } from "./note";

yargs.version("1.0.0");

yargs.command({
  command: "read",
  describe: "Read notes.",
  handler: () => {
    readNote();
  },
});

yargs.command({
  command: "add",
  describe: "Add note into App.",
  builder: {
    title: {
      describe: "Note's title",
      type: "string",
      demandOption: true,
    },
    body: {
      describe: "Note's Body",
      type: "string",
      demandOption: true,
    },
  },
  handler: (args) => {
    createNote({ body: args.title, title: args.body });
  },
});

console.log("render args", yargs.argv);
