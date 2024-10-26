let input = document.getElementById("input");
let textarea = document.getElementById("textarea");
let btn = document.getElementById("save-btn");
let display = document.getElementById("display");

// Function to load notes from localStorage
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach(note => {
    displayNote(note.title, note.content);
  });
}

// Function to display a note
function displayNote(title, content) {
  let note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <h3>${title}</h3>
    <p>${content}</p>
    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
  `;
  
  // Add event listener to the delete button
  note.querySelector(".delete-btn").addEventListener("click", () => {
    deleteNote(title);
    note.remove();
  });
  
  display.appendChild(note);
}

// Function to delete a note from localStorage
function deleteNote(titleToDelete) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes = notes.filter(note => note.title !== titleToDelete);
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Event Listener to add notes
btn.addEventListener("click", () => {
  let noteTitle = input.value;
  let content = textarea.value;

  // Save the note to localStorage
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push({ title: noteTitle, content: content });
  localStorage.setItem("notes", JSON.stringify(notes));

  // Display the note
  displayNote(noteTitle, content);
  
  // Clear the input fields
  input.value = '';
  textarea.value = '';
});

// Load existing notes on page load
loadNotes();
