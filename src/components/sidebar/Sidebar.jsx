import s from "./sidebarStyle.module.scss";
import saveIcon from "../../assets/saveicon.png";
import dashboardIcon from "../../assets/dashboardicon.png";

export default function Sidebar({ setPage, notes, setCurrentNoteId, currentNoteId, deleteNote }) {
  return (
    <aside className={s.sidebar}>
      <button className={s.navBtn} onClick={() => setPage("dashboard")}>
        <img src={dashboardIcon} alt="" width={60} /> Dashboard
      </button>
      <button className={s.newBtn} onClick={() => setCurrentNoteId(null)}>
        <img src={saveIcon} alt="" width={60} /> New Note
      </button>
      
      <div className={s.savedSection}>
        <h3>My Saved Notes</h3>
        <div className={s.notesList}>
          {notes.map((note) => (
            <div 
              key={note.id} 
              className={`${s.noteItem} ${currentNoteId === note.id ? s.active : ""}`}
            >
              <span onClick={() => setCurrentNoteId(note.id)}>
                {note.title || "Untitled Note"}
              </span>
              <button 
                className={s.deleteBtn} 
                onClick={() => deleteNote(note.id)}
                title="Delete note"
              >
                ✕
              </button>
            </div>
          ))}
          {notes.length === 0 && <p className={s.empty}>No notes yet...</p>}
        </div>
      </div>
    </aside>
  );
}
