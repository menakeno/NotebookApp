export default class NotesView {
  constructor(
    root,
    { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
  ) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteDelete = onNoteDelete;

    this.root.innerHTML = `
        <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <h3 class="mb-5">Manage Notebooks</h3>
          <p>Click on title to <strong>edit</strong>, double click on title to <strong>delete</strong>. Use <strong>Add Note Button</strong> to add a new note.</p>
          <button type="button" class="btn btn-sm btn-primary notes__add">Add Note</button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 notes__sidebar">
          <div class="row notes__list">
          
          </div>
        </div>
        <div class="col-lg-6 notes__preview">
              <div class="card overflow-hidden mb-5">
                <div class="row">
                  <div class="col-lg-12">
                    <form class="p-3" id="contact-form" method="post">
                      <div class="card-body pt-1">
                        <div class="col-md-12 pe-2 mb-3">
                          <input class="form-control notes__title" placeholder="Note Title" type="text">
                        </div>
                        <div class="form-group mb-3 mt-4">
                              <textarea name="message" class="form-control notes__body" id="message" rows="16">Take Note...</textarea>
                          </div>
                      </div>
                    </form>
                  </div>
        
                </div>
              </div>
        </div>
      </div>
    </div>
        `;

    const btnAddNote = this.root.querySelector(".notes__add");
    const inpTitle = this.root.querySelector(".notes__title");
    const inpBody = this.root.querySelector(".notes__body");

    btnAddNote.addEventListener("click", () => {
      this.onNoteAdd();
    });

    [inpTitle, inpBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const updatedTitle = inpTitle.value.trim();
        const updatedBody = inpBody.value.trim();

        this.onNoteEdit(updatedTitle, updatedBody);
      });
    });

    console.log(this._createListItemHTML(300, "Hey", "Werey", new Date()));
    //TODO: Hide note preview by default
    this.updateNotePreviewVisibility(false);
  }

  _createListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 60;

    return `
    <div class="col-lg-6 col-sm-6 notes__list-item" data-note-id="${id}">
      <div class="card card-plain card-blog">
                      <div class="card-image border-radius-lg position-relative">
                        <a href="javascript:;">
                          <img class="w-100 border-radius-lg move-on-hover shadow" src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/color-bags.jpg">
                        </a>
                      </div>
                      <div class="card-body px-0">
                        <h5>
                          <a href="javascript:;" class="text-dark font-weight-bold notes__small-title">${title}</a>
                        </h5>
                        <p class="notes__small-body">
                        ${body.substring(0, MAX_BODY_LENGTH)}
                        ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                        </p>
                        <p class="text-secondary notes__small-updated">
                          <em>${updated.toLocaleString(undefined, {
                            dateStyle: "full",
                            timeStyle: "short",
                          })}</em>
                        </p>
                        <input class="form-control" type="file" id="note__change-cover" >
                      </div>
                    </div>
    </div>
    `;
  }

  updateNotesList(notes) {
    const notesListContainer = this.root.querySelector(".notes__list");

    //emplty list
    notesListContainer.innerHTML = " ";

    for (const note of notes) {
      const html = this._createListItemHTML(
        note.id,
        note.title,
        note.body,
        new Date(note.updated)
      );

      notesListContainer.insertAdjacentHTML("beforeend", html);
    }

    //Add the select/delete event
    notesListContainer
      .querySelectorAll(".notes__list-item")
      .forEach((noteListItem) => {
        noteListItem.addEventListener("click", () => {
          this.onNoteSelect(noteListItem.dataset.noteId);
        });

        noteListItem.addEventListener("dblclick", () => {
          const doDelete = confirm("You sure say you wan delete am?");

          if (doDelete) {
            this.onNoteDelete(noteListItem.dataset.noteId);
          }
        });
      });
  }

  updateActiveNote(note) {
    this.root.querySelector(".notes__title").value = note.title;
    this.root.querySelector(".notes__body").value = note.body;

    this.root.querySelectorAll(".notes__list-item").forEach((noteListItem) => {
      noteListItem.classList.remove("notes__list-item--selected"); //change to text-info
    });

    this.root
      .querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
      .classList.add("notes__list-item--selected"); //change to text-info
  }

  updateNotePreviewVisibility(visible) {
    this.root.querySelector(".notes__preview").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}
