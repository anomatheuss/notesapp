# 📓 NotesWeb — My Journey Building a Modern Note App

This is a project I've been working on to level up my React skills. I wanted to build something I would actually use—a note-taking app that doesn't look like every other generic "clean" app. Instead, I went with a **fun and colorful design**: big borders, cool shadows, and colors that really stand out.

## 🚀 What this does
It's a full-featured workspace where I can:
- **Write in Rich Text**: I used Tiptap to allow formatting like Bold, Italic, and Lists.
- **Stay Organized**: It has a folder system (Work, Personal, etc.) and a view to see notes on a calendar.
- **Login Safely**: I integrated Clerk for authentication so I don't have to worry about building a secure login from scratch.
- **Never Lose Work**: Everything saves automatically to my browser's `localStorage`.

## 🛠️ The Tech Part (What I actually did)

Building this taught me a lot about how React actually works under the hood. Here’s a breakdown of the parts I'm most proud of:

### 1. Handling the "Memory" of the App
I used `useState` to keep track of everything: which note is active, which folder is open, and if the mobile menu is showing. The trickiest part was using `useEffect` to make sure my notes stayed saved even if I refreshed the page. I had to learn how to turn my objects into strings for `localStorage` and then back again.

### 2. Creating a Real Editor
It turns out making a text editor is hard! I used the **Tiptap** framework. I had to figure out how to bridge the gap between "standard React" and Tiptap's "command-based" system. I built a custom toolbar where I had to chain commands together (like focusing the editor while applying bold) to make the user experience feel smooth.

### 3. SASS & Design Mixins
Instead of writing the same CSS over and over, I used **SCSS**. I created a "mixin" (sort of like a reusable function for styles) for my custom buttons. This allowed me to keep the design consistent across the sidebar, trash buttons, and save controls without a huge, messy CSS file.

### 4. SPA Routing
I didn't use a heavy router library for this. Instead, I built a simple system where the app decides what to show (Note List vs. Calendar) based on the state. It makes the app feel super fast since it never actually "loads" a new page.

## 🧠 What I Learnt as a Student
- **CSS is powerful**: I realized how much of a "premium" feel comes from small details like the shadows and transitions. Fixing the list-style bug (where my global reset broke the editor bullets) was a huge "aha!" moment for me regarding CSS specificity.
- **State Flow**: Passing data between `App.jsx` and `EditorPage.jsx` made me much more comfortable with props and lifting state up.
- **Problem Solving**: I spent a lot of time debugging why the editor wouldn't show the placeholder—it taught me to really look at the DOM structure and see where classes were missing.

## 📦 How to run it
1. Clone it: `git clone https://github.com/anomatheuss/notesapp.git`
2. Run `npm install`
3. Add your `VITE_CLERK_PUBLISHABLE_KEY` to a `.env` file.
4. Start it up: `npm run dev`

---
*Built by [Matheus Luiz](https://github.com/anomatheuss)*
