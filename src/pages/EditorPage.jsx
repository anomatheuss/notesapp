import React, { useState, useEffect } from "react";
import s from "./EditorPage.module.scss";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Markdown } from '@tiptap/markdown';
import { 
  Bold as BoldIcon, Italic as ItalicIcon, List, ListOrdered, Quote, 
  Code, Save, Trash2, Search, Plus, Home, Calendar as CalendarIcon, 
  FileText, ChevronDown, LogOut, Menu, X 
} from "lucide-react";
import { useUser, UserButton, useClerk } from "@clerk/clerk-react";
import Swal from 'sweetalert2';
import CalendarView from "../components/CalendarView.jsx";

const EditorPage = ({ 
  notes, currentNote, saveNote, deleteNote, setCurrentNoteId,
  folders, addFolder, deleteFolder, selectedFolderId, setSelectedFolderId,
  activeView, setActiveView
}) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [title, setTitle] = useState("");
  const [showFolders, setShowFolders] = useState(true);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Markdown.configure({ html: false, tightLists: true }), Placeholder.configure({ placeholder: 'What are we thinking about today?' })],
    content: '',
    editorProps: { attributes: { class: 'tiptap' } }
  });

  useEffect(() => {
    if (editor && currentNote) {
      setTitle(currentNote.title || "");
      editor.commands.setContent(currentNote.content || "", false);
    }
  }, [currentNote?.id, editor]);

  const handleSave = () => {
    if (!editor || isSaving) return;
    const content = editor.getMarkdown();
    if (!title.trim() && !content.trim()) return;
    setIsSaving(true);
    saveNote({ ...currentNote, title: title.trim() || "Untitled Note", content, date: new Date().toLocaleDateString() });
    setTimeout(() => setIsSaving(false), 500);
  };

  const folderActions = (f) => {
    Swal.fire({ title: 'Delete folder?', text: `Delete "${f.name}"?`, icon: 'warning', showCancelButton: true, confirmButtonColor: '#29314D', cancelButtonColor: '#d33' })
      .then(res => res.isConfirmed && deleteFolder(f.id));
  };

  const navItems = [
    { id: 'notes', icon: Home, label: 'Home', action: () => { setActiveView('notes'); setMobileOpen(false); } },
    { id: 'calendar', icon: CalendarIcon, label: 'Calendar', action: () => { setActiveView('calendar'); setMobileOpen(false); } },
    { id: 'foldertoggle', icon: FileText, label: 'Notes', action: () => setShowFolders(!showFolders), showChevron: true }
  ];

  const tools = [
    { cmd: 'toggleBold', icon: BoldIcon, active: 'bold' },
    { cmd: 'toggleItalic', icon: ItalicIcon, active: 'italic' },
    { cmd: 'toggleBulletList', icon: List, active: 'bulletList' },
    { cmd: 'toggleOrderedList', icon: ListOrdered, active: 'orderedList' },
    { cmd: 'toggleBlockquote', icon: Quote, active: 'blockquote' },
    { cmd: 'toggleCode', icon: Code, active: 'code' },
  ];

  return (
    <div className={`${s.pageContainer} ${mobileOpen ? s.menuOpen : ''}`}>
      <div className={s.appLayout}>
        <aside className={`${s.sidebar} ${mobileOpen ? s.sidebarOpen : ''}`}>
          <div className={s.logo}>
            <div className={s.brandGroup}><div className={s.brandTop}>notes</div><div className={s.brandBottom}>app</div></div>
            <button className={s.closeMenuBtn} onClick={() => setMobileOpen(false)}><X size={24} /></button>
          </div>
          <nav className={s.nav}>
            {navItems.map(item => (
              <div key={item.id} className={`${s.navItem} ${activeView === item.id ? s.active : ''}`} onClick={item.action}>
                <item.icon size={20} /> {item.label} 
                {item.showChevron && <ChevronDown size={16} className={s.chevron} style={{ transform: showFolders ? 'rotate(0deg)' : 'rotate(-90deg)' }} />}
              </div>
            ))}
            {showFolders && folders.map(f => (
              <div key={f.id} className={`${s.folderItem} ${selectedFolderId === f.id ? s.active : ''}`} onClick={() => { setSelectedFolderId(f.id); setActiveView('notes'); setMobileOpen(false); }}>
                <div className={s.dot}></div> {f.name}
                {!['all', 'work', 'personal'].includes(f.id) && <div className={s.deleteBtn} onClick={(e) => { e.stopPropagation(); folderActions(f); }}><Trash2 size={14} /></div>}
              </div>
            ))}
            <div className={s.navItem} onClick={() => signOut()} style={{ marginTop: 'auto' }}><LogOut size={20} /> Log Out</div>
          </nav>
          <div className={s.userProfile}><UserButton /><div className={s.userInfo}><span className={s.userName}>{user?.fullName || "User"}</span><span className={s.userRole}>Premium Member</span></div></div>
        </aside>

        <div className={s.mobileTopbar}>
          <button className={s.hamburgerBtn} onClick={() => setMobileOpen(true)}><Menu size={24} /></button>
          <div className={s.mobileLogo}>notes app</div>
          <UserButton />
        </div>

        <section className={s.notesPanel}>
          <div className={s.panelHeader}>
            <h3>{folders.find(f => f.id === selectedFolderId)?.name || "All Ideas"}</h3>
            <div className={s.headerActions}><Search size={18} /></div>
          </div>
          <div className={s.notesList}>
            {(selectedFolderId === 'all' ? notes : notes.filter(n => n.folderId === selectedFolderId)).map(note => (
              <div key={note.id} className={`${s.noteItem} ${currentNote?.id === note.id ? s.active : ""}`} onClick={() => { setCurrentNoteId(note.id); setActiveView('notes'); }}>
                <div className={s.deleteNoteBtn} onClick={(e) => { e.stopPropagation(); Swal.fire({ title: 'Delete note?', icon: 'warning', showCancelButton: true }).then(r => r.isConfirmed && deleteNote(note.id)); }}><Trash2 size={16} /></div>
                <div className={s.noteTitle}>{note.title || "Untitled Note"}</div>
                <div className={s.noteSnippet}>{(note.content || "").replace(/<[^>]*>?/gm, '').substring(0, 80)}</div>
                <div className={s.noteMeta}><span>{note.date || "Just now"}</span></div>
              </div>
            ))}
          </div>
          <button className={s.addNoteBtn} onClick={() => { setTitle(""); editor?.commands.clearContent(); setCurrentNoteId(null); }}><Plus size={18} /> Add New Idea</button>
        </section>

        <main className={s.editorMain}>
          {activeView === 'calendar' ? <CalendarView notes={notes} /> : (
            <>
              <div className={s.toolbar}>
                <div className={s.toolGroup}>
                  {tools.map(t => (
                    <button 
                      key={t.cmd} 
                      className={`${s.toolBtn} ${editor?.isActive(t.active) ? s.toolActive : ''}`} 
                      onMouseDown={e => { e.preventDefault(); editor?.chain().focus()[t.cmd]().run(); }}
                    >
                      <t.icon size={18} />
                    </button>
                  ))}
                </div>
                <button className={s.saveBtn} onClick={handleSave} disabled={isSaving}>
                  <Save size={18} /> {isSaving ? "Saving..." : "Save Note"}
                </button>
              </div>
              <div className={s.editorInner}>
                <input className={s.titleInput} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Untitled Document..." />
                <div className={s.tiptapContainer}>
                  <EditorContent editor={editor} />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default EditorPage;
