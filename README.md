# 📓 NotesWeb — A Space for Your Mind

**NotesWeb** is a high-performance, modern note-taking application designed with a **Brutalist Aesthetic**. It combines a sleek, high-contrast user interface with a powerful rich-text editing experience, allowing users to organize their thoughts, tasks, and ideas seamlessly.

![NotesApp Showcase](https://github.com/anomatheuss/notesapp/raw/main/public/preview.png) *(Note: Add your own screenshot path here later!)*

## 🚀 Key Features

-   **⚡ Rich Text Editing**: Powered by **Tiptap**, supporting bold, italic, blockquotes, code blocks, and dynamic lists.
-   **🎨 Brutalist Design**: A unique "Neo-Brutalist" UI using bold borders, sharp shadows, and a vibrant color palette (`#D6BCFF`, `#6e61ff`, `#29314D`).
-   **📅 Calendar View**: Visualize your notes over time with an integrated calendar component.
-   **📁 Folder Organization**: Categorize your ideas into Work, Personal, or custom folders.
-   **🔐 Secure Authentication**: Integrated with **Clerk** for robust user login and profile management.
-   **💾 Persistence**: Automatic saving to `localStorage` so you never lose a thought.
-   **📱 Fully Responsive**: A custom-built mobile layout with a specialized hamburger menu and optimized editor experience.

## 🛠️ Technical Implementation (What I Built)

### 1. Robust State Management (`useState` & `useEffect`)
One of the core challenges was synchronizing the editor's state with the application's global storage. I utilized:
-   **`useState`**: To manage active notes, folder selection, UI toggles (mobile menus), and the current active view (Notes vs. Calendar).
-   **`useEffect`**: To handle data persistence by stringifying state into `localStorage` whenever changes occur, ensuring a "save-less" feel for the user.

### 2. Advanced Component Architecture
The project is modularized into several key areas:
-   **`EditorPage`**: The heart of the app, managing the complex lifecycle of the Tiptap editor and the various toolbars.
-   **Dynamic Sidebar**: A recursive-style navigation system that handles folder filtering and view switching.
-   **Custom SCSS Modules**: I chose **SASS Modules** over standard CSS to avoid naming collisions and to implement complex "Brutalist" mixins for reusable button styles.

### 3. Routing & Conditional Rendering
Instead of traditional multi-page navigation, I optimized the app as a **Single Page Application (SPA)** using state-driven conditional rendering. This provides a lightning-fast feel when switching between your Note List, the Editor, and the Calendar View.

### 4. Integration of Tiptap
Unlike simple textareas, I integrated the **Tiptap Framework** (built on ProseMirror). This required:
-   Configuring extensions like `StarterKit`, `Placeholder`, and `Markdown`.
-   Building a custom toolbar that uses command chaining (e.g., `editor.chain().focus().toggleBold().run()`) to ensure the user never loses focus while formatting.

## 🧠 What I Learned

During the development of this repository, I gained deep experience in:

-   **Mastering the React Lifecycle**: Understanding how to prevent unnecessary re-renders when dealing with high-frequency text input.
-   **CSS Architecture**: Learning how to override global resets (like `list-style: none`) while maintaining a clean, scoped design system using SCSS Mixins.
-   **Third-Party Integrations**: Successfully merging **Clerk** (Auth), **Tiptap** (Editor), and **Lucide-React** (Icons) into a cohesive ecosystem.
-   **Mobile-First Design**: Challenging myself to rebuild the complex horizontal editor layout into a vertical, touch-friendly structure for mobile users.
-   **Git Workflow**: Managing version control, initializing repositories, and deploying code to GitHub.

## 📦 Installation & Setup

1. **Clone the repo**:
   ```bash
   git clone https://github.com/anomatheuss/notesapp.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Variables**:
   Create a `.env` file and add your Clerk Publishable Key:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_key_here
   ```
4. **Run Dev Server**:
   ```bash
   npm run dev
   ```

---
*Created with ❤️ by [Matheus Luiz](https://github.com/anomatheuss)*
