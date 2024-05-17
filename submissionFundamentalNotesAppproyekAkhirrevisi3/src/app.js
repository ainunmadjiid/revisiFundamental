import "./style.css";
import "./responsive.css";
import "../componen/index.js";
import notesData from "./data.js";

const noteItem = document.querySelector("note-item");
noteItem.note = notesData;

document.querySelector("input-note").addEventListener("note-added", (event) => {
  notesData.push(event.detail);

  const note = document.querySelector("note-item");
  noteItem.note = notesData;
});
