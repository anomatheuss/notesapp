import React, { useState, useEffect } from "react";
import "./globalStyle.scss";
import EditorPage from "./pages/EditorPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import s from "./App.module.scss";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [activeView, setActiveView] = useState("notes");
  const [selectedFolderId, setSelectedFolderId] = useState("all");
  const [currentNoteId, setCurrentNoteId] = useState(null);

  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("all_notes") || "[]"));
  const [folders, setFolders] = useState(() => JSON.parse(localStorage.getItem("all_folders") || JSON.stringify([
    { id: 'all', name: 'All Ideas', icon: 'FileText' },
    { id: 'work', name: 'Work', icon: 'Folder' },
    { id: 'personal', name: 'Personal', icon: 'Folder' }
  ])));

  useEffect(() => localStorage.setItem("all_notes", JSON.stringify(notes)), [notes]);
  useEffect(() => localStorage.setItem("all_folders", JSON.stringify(folders)), [folders]);

  const saveNote = (data) => {
    const updated = { ...data, id: data.id || Date.now(), folderId: data.folderId || (selectedFolderId !== 'all' ? selectedFolderId : null), date: new Date().toLocaleDateString() };
    setNotes(prev => prev.some(n => n.id === updated.id) ? prev.map(n => n.id === updated.id ? updated : n) : [updated, ...prev]);
    setCurrentNoteId(updated.id);
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (currentNoteId === id) setCurrentNoteId(null);
  };

  const addFolder = (name) => setFolders([...folders, { id: Date.now().toString(), name, icon: 'Folder' }]);

  const deleteFolder = (id) => {
    if (['all', 'work', 'personal'].includes(id)) return;
    setFolders(prev => prev.filter(f => f.id !== id));
    setNotes(prev => prev.map(n => n.folderId === id ? { ...n, folderId: null } : n));
    if (selectedFolderId === id) setSelectedFolderId('all');
  };

  return (
    <>
      <SignedIn>
        <div className={s.contentWrapper}>
          <EditorPage 
            notes={notes} currentNote={notes.find(n => n.id === currentNoteId) || { title: "", content: "", folderId: null }}
            saveNote={saveNote} deleteNote={deleteNote} setCurrentNoteId={setCurrentNoteId}
            folders={folders} addFolder={addFolder} deleteFolder={deleteFolder}
            selectedFolderId={selectedFolderId} setSelectedFolderId={setSelectedFolderId}
            activeView={activeView} setActiveView={setActiveView}
          />
        </div>
      </SignedIn>
      <SignedOut>
        {showLogin ? <LoginPage onBack={() => setShowLogin(false)} /> : <LandingPage onStart={() => setShowLogin(true)} />}
      </SignedOut>
    </>
  );
};

export default App;
