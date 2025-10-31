# AI E-mail assistant / Gmail-Chrome extension & Angular front end

A full-stack application that provides AI-powered email responses using Google's Gemini 2.5 Flash API. This project features both a Chrome Extension for seamless Gmail integration and a Angular web application, backed by a robust Spring Boot 3 backend.


Key highlights:

- 🤖 AI-Powered Email Responses - Leverages Gemini 2.5 Flash for intelligent reply generation

- 🎭 Multiple Response Tones - Professional, friendly, apologetic, persuasive, and concise

- 🔌 Seamless Gmail Integration - Chrome Extension works directly within Gmail interface

- 🌐 Angular Web Application - Complete Angular frontend for manual email composition

- ⚡ Modern Tech Stack - Spring Boot 3, Angular 16, Java 17

- 🎨 Professional UI - Angular Material & Bootstrap 5 design

## 🎥 Demo Videos

### Chrome - Gmail extension
**📺 Watch here:** https://www.youtube.com/watch?v=GMzUMhRNuaM

### Angular - Integration
**📺 Watch here:** https://www.youtube.com/watch?v=GMzUMhRNuaM

---

## ⚙️ Technologies

### 🔙 Backend (Spring Boot 3.4.1 / Java 17)

- **Spring Boot 3.4.1** - Main application framework
- **Java 17** - Programming language
- **Spring Data JPA** - Database abstraction and repository layer
- **Spring Web** - RESTful web services and MVC

## 🅰️ Frontend (Angular 16)

### 🧩 Core Technologies
- **Angular 16** — Latest stable version with enhanced performance.
- **TypeScript 5.1** — Strong typing and improved developer experience.
- **RxJS 7.8** — Reactive programming and efficient state management.
- **Angular Router** — Client-side navigation and routing.

### 🎨 UI Components & Styling
- **Angular Material 16** — Material Design component library.
- **Bootstrap 5.3** — Responsive CSS framework and utility classes.
- **Angular CDK** — Component Development Kit for custom UI behaviors.
- **Responsive Design** — Mobile-first layout adaptable to all devices.

## 🎯 Gmail Integration

### 🧠 Core Concepts
- **DOM Observers** — Real-time monitoring of Gmail’s dynamic interface.
- **Dynamic Injection** — Context-aware placement of custom UI elements.
- **Event Handling** — Manages user interactions and AI response triggers.
- **Style Isolation** — Scoped CSS to prevent style conflicts with Gmail’s UI.

---

## 🚀 Setup & Installation

### 🔧 Prerequisites

#### 🧰 Required Software
- **Node.js 18+** — JavaScript runtime for Angular development.
- **Java 17** — JDK required for the Spring Boot backend.
- **Chrome Browser** — Needed for extension development and testing.
- **Maven 3.6+** — Dependency and build management for the backend.

---

## 🧩 Chrome Extension Structure

The Chrome extension enables seamless integration with Gmail, allowing the AI assistant to generate replies directly inside the Gmail compose window.

### 📁 Folder Structure
email-writer-extension/
│
├── 📄 manifest.json → Defines the extension’s permissions, scripts, and metadata.
├── 📄 content.js → Main logic file injected into Gmail’s DOM.
│ Handles:
│ • Detecting Gmail compose boxes.
│ • Injecting custom AI reply buttons.
│ • Sending and receiving messages from the backend API.
│
├── 🎨 content.css → Styles applied to injected UI components.
│ Ensures a consistent look while isolating styles from Gmail’s own CSS.

### ⚙️ How to Load the Extension in Chrome

1. Open **Google Chrome** and navigate to:  
   `chrome://extensions/`

2. In the top-right corner, **enable Developer Mode**.

3. Click on **“Pack extension”** or **“Load unpacked”** (recommended).

4. Select the folder path to the folder email-writer-extension


5. Once loaded, **pin the extension** in the Chrome toolbar for quick access.

6. Open **Gmail**, click **Reply** on any email, then click the **AI Email Assistant icon** in the toolbar to generate a smart response.

---

✅ **Tip:** You can modify `content.js` to adjust UI placement or trigger conditions if Gmail’s interface changes in the future.

