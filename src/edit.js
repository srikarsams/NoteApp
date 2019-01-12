import { initializeEditPage, generateLastEdited } from "./view"
import { updateNote, removeNote } from "./notes"

const noteId = location.hash.substring(1)
const noteTitleElement = document.querySelector("#note-title")
const noteBodyElement = document.querySelector("#note-body")
const updatedAtElement = document.querySelector("#updatedAt")

initializeEditPage(noteId)

noteTitleElement.addEventListener("input", (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    })
    updatedAtElement.textContent = generateLastEdited(note.updatedAt)
})

noteBodyElement.addEventListener("input", (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    updatedAtElement.textContent = generateLastEdited(note.updatedAt)
})

document.querySelector("#remove-note").addEventListener("click", () => {
    removeNote(noteId)
    location.assign("/index.html")
})

window.addEventListener("storage", (e) => {
    if(e.key === "notes"){
        initializeEditPage(noteId)
    }
})

