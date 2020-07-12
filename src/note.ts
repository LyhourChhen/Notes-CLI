import fs from "fs"



export const addNote = (title: String, body: String): void => {
    fs.writeFileSync("../db/db.json", `${title} ${body}`)

}

