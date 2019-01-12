import uuidv4 from "uuid/v4"
import moment from "moment"


let notes= []

// Read existing notes from localStorage
const getSavedNotes = () => {
    let notesJSON = localStorage.getItem("notes")
    return notesJSON ? JSON.parse(notesJSON) : [] 
}

// expose notes from module
const getNotes = () => notes

// Create notes
const createNote = () => {
    const id = uuidv4()
    const timestamp = moment().valueOf()
    notes.push({
        id: id,
        title: "",
        body: "",
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveNotes()
    return id
}

// save notes to the localStorage
const saveNotes = () => {
    localStorage.setItem("notes", JSON.stringify(notes))
}

// Remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)
    if (noteIndex > -1){
        notes.splice(noteIndex,1)
        saveNotes(notes)
    }   
}

// Sort notes by one of the three ways
const sortNotes = (sortBy) => {
    if (sortBy === "byEdited") {
        return notes.sort((a,b) => {
            if(a.updatedAt > b.updatedAt){
                return -1
            }else{
                return 1
            }
        })
    }else if (sortBy === "byCreated"){
        return notes.sort((a, b) => {
            if(a.createdAt < b.createdAt){
                return 1
            }else{
                return -1
            }
        })
    }else{
        return notes.sort((a,b) => {
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            }else{
                return 1
            }
        })
    }
} 

// funtion for updating notes

const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)

    if(!note) {
        return 
    }

    if (typeof updates.title === "string") {
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    }

    if(typeof updates.body === "string") {
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }

    saveNotes()
    return note
}

notes = getSavedNotes();

export { getNotes, createNote, removeNote, sortNotes, updateNote }