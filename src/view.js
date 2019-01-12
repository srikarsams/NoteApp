import moment from "moment";
import { sortNotes, getNotes } from "./notes";
import { getFilters } from "./filters";

// Generate last edited text content
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`

// Render notes to the DOM
const renderNotes = () => {
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    const notesEl = document.querySelector("#notes")
    notesEl.innerHTML=""
    if (filteredNotes.length > 0){
        filteredNotes.forEach((note) => {
            const p = generateNoteDOM(note)        
            notesEl.appendChild(p)
        })
    }else{
        notesEl.innerHTML="<p class='empty-message'>No notes to show</p>"
    }
}

// Generate the DOM structure for a note

const generateNoteDOM = (note) => {
    const div = document.createElement("a")
    const p = document.createElement("p")
    const status = document.createElement('p')
    // setup the text span
    
    if (note.title.length > 0){
        p.textContent = note.title
    }else{
        p.textContent = "Unnamed note"
    }
    div.appendChild(p)
    p.classList.add("list-item__title")
    // Setup the link
    div.href=`/edit.html#${note.id}`
    div.classList.add("list-item")

    // setup status message
    status.textContent = generateLastEdited(note.updatedAt)
    status.classList.add('list-item__subtitle')
    div.appendChild(status)
    return div
}

const initializeEditPage = (noteId) => {
    const noteTitleElement = document.querySelector("#note-title")  
    const noteBodyElement = document.querySelector("#note-body")
    const updatedAtElement = document.querySelector("#updatedAt")
    const notes = getNotes()
    const note = notes.find((note) => note.id === noteId)
    
    if(!note){
        location.assign("/index.html")
    }
    
    noteTitleElement.value = note.title
    noteBodyElement.value = note.body
    updatedAtElement.textContent = generateLastEdited(note.updatedAt)    
}

export { generateLastEdited, generateNoteDOM, renderNotes, initializeEditPage }