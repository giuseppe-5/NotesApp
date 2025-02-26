document.addEventListener("DOMContentLoaded", function () {

    const addItem = document.getElementById("add-item");
    const popupDiv = document.getElementById("popup-div");
    const popupEditDiv = document.getElementById("popupEdit-div");
    const closeBtn = document.getElementById("close-btn");
    const saveBtn = document.getElementById("save-btn");
    const noteInput = document.getElementById("note-input");

    let editMode = false;
    let currentNote = null;

    addItem.addEventListener("click", function () {
        editMode = false;
        popupDiv.style.display = "flex";
    })

    closeBtn.addEventListener("click", function () {
        popupDiv.style.display = "none";
        noteInput.value = "";
        editMode = false;
    })

    saveBtn.addEventListener("click", function () {
        const textareaValue = noteInput.value;

        if (textareaValue.trim() === "") {
            alert("Note can not be empty!");
            return;
        }

        if (editMode && currentNote) {
            const noteText = currentNote.querySelector("#note-text");
            noteText.textContent = textareaValue;
        } else {
            const newNote = document.createElement("li");
            newNote.id = "note-item";

            const noteText = document.createElement("span");
            noteText.id = "note-text";
            noteText.textContent = textareaValue;
            newNote.appendChild(noteText);

            const controlDiv = document.createElement("div");
            controlDiv.id = "control-div";

            const editButton = document.createElement("button");
            editButton.id = "note-edit";
            editButton.textContent = "Edit";
            controlDiv.appendChild(editButton);

            const removeButton = document.createElement("button");
            removeButton.id = "note-remove";
            removeButton.textContent = "Remove";
            controlDiv.appendChild(removeButton);

            newNote.appendChild(controlDiv);

            document.querySelector("#notes-div ul").appendChild(newNote);

            editButton.addEventListener("click", function () {
                noteInput.value = noteText.textContent;
                editMode = true;
                currentNote = newNote;
                popupDiv.style.display = "flex";
            })

            removeButton.addEventListener("click", function () {
                newNote.remove();
            });
            noteInput.value = "";
        }

        noteInput.value = "";
        popupDiv.style.display = "none";
        editMode = false;
        currentNote = null;
    });
});