import { createNote } from "./notes"
import { setFilters } from "./filters"
import {renderNotes } from "./view"


// Render all the notes
renderNotes()

// Create a new note
document.querySelector('#create-note').addEventListener('click',  (e) => {
    const id = createNote()
    location.assign(`/edit.html#${id}`)
})

// Search notes
document.querySelector("#search-text").addEventListener("input", (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderNotes()
})

// Filter notes
document.querySelector("#filterBy").addEventListener("change", (e) => {
    setFilters({
        sortBy: e.target.value
    })
    renderNotes()
})

window.addEventListener("storage", (e) => {
    if(e.key === "notes"){
        renderNotes()
    }
})