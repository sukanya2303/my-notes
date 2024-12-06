// Grab DOM elements
const noteTitle = document.getElementById('noteTitle');
const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesList = document.getElementById('notesList');

// Retrieve notes from localStorage
function getNotes() {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}

// Save notes to localStorage
function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Render all notes
function renderNotes() {
    const notes = getNotes();
    notesList.innerHTML = ''; // Clear current list
    notes.forEach(note => {
        createNoteItem(note.title, note.content);
    });
}

// Function to create a new note item
function createNoteItem(title, noteText) {
    const noteItem = document.createElement('div');
    noteItem.classList.add('note-item');
    
    // Create title element
    const noteTitleElem = document.createElement('div');
    noteTitleElem.classList.add('note-title1');
    noteTitleElem.textContent = title;

    // Create note content element
    const noteContentElem = document.createElement('div');
    noteContentElem.classList.add('note-content');
    noteContentElem.textContent = noteText;

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        const notes = getNotes();
        const updatedNotes = notes.filter(note => note.title !== title || note.content !== noteText);
        saveNotes(updatedNotes); // Save updated list
        renderNotes(); // Re-render notes
    });

    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => {
        noteTitle.value = title;
        noteInput.value = noteText;

        // Remove the note from localStorage
        const notes = getNotes();
        const updatedNotes = notes.filter(note => note.title !== title || note.content !== noteText);
        saveNotes(updatedNotes); // Save updated list
        renderNotes(); // Re-render notes
    });

    // Append title, content, delete button, and edit button to the note item
    noteItem.appendChild(noteTitleElem);
    noteItem.appendChild(noteContentElem);
    noteItem.appendChild(editBtn);
    noteItem.appendChild(deleteBtn);

    // Append the note item to the notes list
    notesList.appendChild(noteItem);
}

// Event listener to add a new note
addNoteBtn.addEventListener('click', () => {
    const titleText = noteTitle.value.trim();
    const noteText = noteInput.value.trim();
    if (titleText !== "" && noteText !== "") {
        // Save the new note to localStorage
        const notes = getNotes();
        notes.push({ title: titleText, content: noteText });
        saveNotes(notes);

        // Add the new note to the UI
        createNoteItem(titleText, noteText);

        // Clear input fields
        noteTitle.value = "";
        noteInput.value = "";
    } else {
        alert("Please enter both a title and note content!");
    }
});

// Load notes when the page is loaded
document.addEventListener('DOMContentLoaded', renderNotes);

// Allow pressing "Enter" to add a note (on the content field)
noteInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addNoteBtn.click();
    }
});