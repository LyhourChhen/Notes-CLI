import fs from "fs"
import {
    table,
    getBorderCharacters
} from 'table';


interface NoteInterface {
    title: any;
    body: any;
}


export const readNote = () => {
    const datas = []
    const getNote = fs.readFileSync("./db/db.json");
    const jsonNote = getNote.toString();
    const parseData = JSON.parse(jsonNote)
    datas.push(parseData)

    const config = {
        singleLine: true
    };
    const data = [
        datas.map((data) => {
            [`${data.title}`, `${data.body}`]
        })
    ];
    const output = table(data, config);
    console.log(output);
}


export const createNote = (args: NoteInterface): void => {
    const note: Object = {
        title: args.title,
        body: args.body
    }
    const jsonNote = JSON.stringify(note)
    fs.writeFileSync("./db/db.json", jsonNote)
}



