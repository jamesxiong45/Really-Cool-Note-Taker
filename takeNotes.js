

// Get the elements we need from the DOM

const list = document.querySelector('.list-group');
const noteTitle = document.querySelector('.note-title');
const noteTextarea = document.querySelector('.note-textarea');
const saveNote = document.querySelector('.save-note');
const newNote = document.querySelector('.new-note');

// Create an array to hold our notes
let notes = [];

// Check if we have any saved notes in local storage
if (localStorage.getItem('notes')) {
  notes = JSON.parse(localStorage.getItem('notes'));
  renderNotes();
}

// Event listeners for saving and creating new notes
saveNote.addEventListener('click', saveNoteHandler);
newNote.addEventListener('click', newNoteHandler);

// Render our notes in the list
function renderNotes() {
  list.innerHTML = '';
  notes.forEach(note => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.dataset.noteId = note.id;
    listItem.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="mb-0">${note.title}</h5>
        <div>
          <i class="far fa-trash-alt delete-note"></i>
        </div>
      </div>
      <p class="mb-0">${note.text}</p>
    `;
    list.appendChild(listItem);
  });
}

// Handler for saving a new note
function saveNoteHandler() {
  const title = noteTitle.value.trim();
  const text = noteTextarea.value.trim();

  // If either title or text is empty, don't save the note
  if (!title || !text) {
    return;
  }

  // Create a new note object and add it to the notes array
  const newNote = {
    id: Date.now(),
    title,
    text,
  };
  notes.push(newNote);

  // Reset the input fields and render the updated notes list
  noteTitle.value = '';
  noteTextarea.value = '';
  renderNotes();

  // Save the updated notes array to local storage
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Handler for creating a new, empty note
function newNoteHandler() {
  noteTitle.value = '';
  noteTextarea.value = '';
}

module.export =