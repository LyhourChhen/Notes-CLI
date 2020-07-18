import fs from "fs";
import { table, getBorderCharacters } from "table";

interface NoteInterface {
  title: any;
  body: any;
}

export const readNote = (): void => {
  const datas = [];
  const getNote = fs.readFileSync("./db/db.json");
  const jsonNote = getNote.toString();
  const parseData = JSON.parse(jsonNote);
  datas.push(parseData);

  const config = {
    singleLine: true,
  };
  const data = [
    parseData.map((data: any) => {
      return [`${data.title} : ${data.body}`];
    }),
  ];
  const output = table(data, config);
  console.log(output);
};

export const createNote = (args: any): void => {
  const notes = loadNote();
  // Check duplocated note
  const duplicatedNotes = notes.filter((note: any) => {
    return note.title === args.title;
  });
  if (duplicatedNotes.length === 0) {
    notes.push({
      title: args.title,
      body: args.body,
    });
    // @ts-ignore
    saveNotes(notes);
    console.log("New Note Added !");
  } else {
    console.log("note is taken");
  }
  // @ts-ignore
  saveNotes(notes);
};

// Function Helper

const loadNote = (): Array<NoteInterface> => {
  try {
    const dataBuffer = fs.readFileSync("./db/db.json");
    const dataJSON = dataBuffer.toString();
    return [JSON.parse(dataJSON)];
  } catch (error) {
    return [];
  }
};

const saveNotes = (note: NoteInterface): void => {
  const dataJSON = JSON.stringify(note);
  fs.writeFileSync("./db/db.json", dataJSON);
};
