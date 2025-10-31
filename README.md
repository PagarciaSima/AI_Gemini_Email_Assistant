AI Email Writer - Chrome Extension & Web Application
A sophisticated full-stack application that provides AI-powered email responses using Google's Gemini 2.5 Flash API. This project features both a Chrome Extension for seamless Gmail integration and a standalone Angular web application, backed by a robust Spring Boot 3 backend.

Perfect for professionals seeking to enhance their email communication efficiency, this tool analyzes incoming emails and generates contextually appropriate responses in various tones, saving time while maintaining communication quality.

Key highlights:

🤖 AI-Powered Email Responses - Leverages Gemini 2.5 Flash for intelligent reply generation

🎭 Multiple Response Tones - Professional, friendly, apologetic, persuasive, and concise

🔌 Seamless Gmail Integration - Chrome Extension works directly within Gmail interface

🌐 Standalone Web Application - Complete Angular frontend for manual email composition

⚡ Modern Tech Stack - Spring Boot 3, Angular 16, Java 17

🎨 Professional UI - Angular Material & Bootstrap 5 design

🎥 Demo
📺 Chrome Extension Demo
Watch here: [Demo Video Link - Coming Soon]

This video showcases the seamless Gmail integration:

🔧 Chrome Extension installation and setup

📧 Automatic email content detection in Gmail

🎚️ Tone selection dropdown directly in Gmail compose window

⚡ One-click AI response generation

📝 Generated response insertion into email body

✏️ Easy editing and customization of AI responses

🌐 Web Application Demo
Watch here: [Demo Video Link - Coming Soon]

This video demonstrates the full web application capabilities:

🏠 Clean, responsive web interface

📋 Manual email input with rich text support

🎛️ Comprehensive tone selection options

🔄 Real-time response generation preview

📋 Copy-to-clipboard functionality

📱 Mobile-responsive design

🛠️ Key Features
🔌 Chrome Extension Features
🚀 One-Click Gmail Integration
Direct Gmail Integration - Works within native Gmail interface

Automatic Email Context Detection - Reads and analyzes incoming email content

Non-Intrusive UI - Minimal impact on Gmail's design and workflow

Smart Placement - AI response buttons appear only in relevant contexts

🎭 Advanced Tone Selection
Professional - Formal business communication for corporate environments

Friendly - Casual, relationship-building tone for colleagues and contacts

Apologetic - Service recovery and customer relations

Persuasive - Sales, negotiations, and convincing arguments

Concise - Quick, to-the-point responses for busy professionals

⚡ Seamless User Experience
Inline Response Generation - No tab switching required

Instant Insertion - Generated responses placed directly in reply box

Edit-Friendly - Easy customization before sending

Preserved Formatting - Maintains email structure and professionalism

🌐 Web Application Features
📝 Manual Email Composition
Flexible Input Options - Paste any email content for response generation

Rich Text Support - Maintains formatting and structure

Context Preservation - AI understands email threads and relationships

Multi-Language Support - Handles various languages and contexts

🎨 Response Customization
Tone Preview - Understand each tone's characteristics before generating

Real-time Generation - Instant AI response creation

Multiple Generation Options - Generate alternatives for comparison

Edit & Refine - Fine-tune generated responses as needed

💼 Professional Workflow
Copy to Clipboard - One-click transfer to any email client

Response History - Track frequently used templates and styles

Export Options - Save responses for future use

Keyboard Shortcuts - Efficient workflow navigation

🔧 Technical Features
🛡️ Security & Privacy
No Data Storage - Email content processed in real-time, not stored

Secure API Communication - All requests use HTTPS encryption

Limited Permissions - Chrome extension only accesses Gmail domains

API Key Protection - Secure backend handling of Gemini API credentials

⚙️ Performance & Reliability
Fast Response Times - Optimized API calls to Gemini 2.5 Flash

Error Handling - Graceful degradation when API unavailable

Offline Capabilities - Basic functionality without internet connection

Cross-Platform Compatibility - Works across all major browsers and devices

⚙️ Technologies
🔙 Backend (Spring Boot 3 / Java 17)
🏗️ Core Framework
Spring Boot 3 - Modern application framework with latest features

Java 17 - Latest LTS version with enhanced performance

Spring Web - RESTful web services and MVC architecture

Spring Validation - Request validation and error handling

🤖 AI Integration
Gemini 2.5 Flash API - Google's latest AI model for fast, accurate responses

Google AI API Client - Official Java client for Gemini integration

Custom Prompt Engineering - Optimized prompts for email response generation

Context Management - Intelligent email context analysis and preservation

🔐 Security & Configuration
CORS Configuration - Secure cross-origin resource sharing

Environment Configuration - Externalized application properties

API Rate Limiting - Controlled API usage and cost management

Error Handling - Comprehensive exception management

🛠️ Development Tools
Spring Boot DevTools - Hot reload and development utilities

Maven - Dependency management and build automation

Lombok - Reduced boilerplate code

JUnit 5 - Comprehensive testing framework

🔜 Frontend (Angular 16)
🅰️ Core Framework
Angular 16 - Latest stable version with enhanced performance

TypeScript 5.1 - Enhanced type safety and developer experience

RxJS 7.8 - Reactive programming and state management

Angular Router - Client-side navigation and routing

🎨 UI Components & Styling
Angular Material 16 - Material Design component library

Bootstrap 5.3 - Responsive CSS framework and utilities

Angular CDK - Component development kit for custom interactions

Responsive Design - Mobile-first approach across all devices

🔧 Development & UX
SweetAlert2 - Beautiful, accessible modal dialogs and notifications

Angular Forms - Reactive forms with validation

HTTP Client - Efficient API communication with interceptors

Component Architecture - Modular, reusable component structure

🔌 Chrome Extension
🌐 Extension Architecture
Manifest V3 - Latest Chrome extension specification

Content Scripts - Gmail DOM integration and manipulation

Message Passing - Secure communication between components

Chrome APIs - Extension lifecycle and storage management

🎯 Gmail Integration
DOM Observers - Real-time Gmail interface monitoring

Dynamic Injection - Context-aware UI element placement

Event Handling - User interaction and response management

Style Isolation - CSS scoping to prevent Gmail conflicts

🚀 Setup & Installation
🔧 Prerequisites
Required Software
Node.js 18+ - JavaScript runtime for Angular development

Java 17 - JDK for Spring Boot backend

Chrome Browser - For extension development and testing

Maven 3.6+ - Java dependency management

Angular CLI 16 - Angular development tools

API Keys
Google Gemini API Key - Required for AI response generation

Obtain from: Google AI Studio

Configure in backend application.properties
