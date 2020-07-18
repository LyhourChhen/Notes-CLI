import fs from "fs";
import { table, getBorderCharacters } from "table";
import { v4 as uuidv4 } from "uuid";
import * as _ from "lodash";

interface NoteInterface {
  id?: any;
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
      id: uuidv4(),
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

export const deleteNote = (id: any) => {
  const notes = loadNote();

  //   This is wrong
  const removeNote_ = _.remove(notes, (note) => {
    note.id === id;
  });

  const removeNote = notes.filter((note) => {
    if (id !== note.id) {
      throw "Id not found";
    }
    return note.id !== id;
  });

  // @ts-ignore
  saveNotes(removeNote);
};

export const modifiedNote = (args: NoteInterface) => {
  const notes = loadNote();
  const index: number = notes.findIndex((note) => note.id === args.id);
  console.log("render index", index);
  if (index !== null || undefined) {
    // @ts-ignore
    notes[index].title = args.title;
    // @ts-ignore
    notes[index].body = args.body;
    // @ts-ignore
    saveNotes(notes);
  } else {
    console.log("We can't find your note base on your id you provided");
  }
};

// Function Helper

const loadNote = (): Array<NoteInterface> => {
  try {
    const dataBuffer = fs.readFileSync("./db/db.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const saveNotes = (note: NoteInterface): void => {
  const dataJSON = JSON.stringify(note);
  fs.writeFileSync("./db/db.json", dataJSON);
};
