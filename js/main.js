import App from "./App.js";

/*import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";
*/
/*NotesAPI.saveNote({
  //comment Id when adding new data
    id: 508167,
  title: "Papa Ajasco",
  body: "Lorem lorem ipsum numbian queen",
});*/

//NotesAPI.deleteNote(710868);

//console.log(NotesAPI.getAllNotes());

//const app = document.getElementById("app");

/*const view = new NotesView(app, {
  onNoteAdd() {
    console.log("Let's add a new note");
  },

  onNoteSelect(id) {
    console.log("Note Selected: " + id);
  },
  onNoteDelete(id) {
    console.log("Note DELETED: " + id);
  },
  onNoteEdit(newTitle, newBody) {
    console.log(newTitle);
    console.log(newBody);
  },
});

const notes = NotesAPI.getAllNotes();

view.updateNotesList(notes);
view.updateActiveNote(notes[0]);
*/

const root = document.getElementById("app");
const app = new App(root);
