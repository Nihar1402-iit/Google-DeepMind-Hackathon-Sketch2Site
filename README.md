**Google DeepMind - Vibe Code with Gemini 3 Pro in AI Studio Hackathon**

**# Sketch2Site**

Sketch2Site is an AI-powered tool that transforms hand-drawn UI sketches into fully functional web interfaces—automatically. It bridges the gap between visual design and frontend development by allowing users to upload a photo of a rough interface sketch (e.g., drawn on paper or a whiteboard), and then instantly generating clean, semantic HTML/CSS code along with a live preview of the webpage.

The entire application is powered by **Gemini 3 Pro**, Google’s multimodal large language model, and built inside **Google AI Studio’s Build environment**, making it deployable and usable as a standalone interactive web app.

![Cover](https://www.googleapis.com/download/storage/v1/b/kaggle-user-content/o/inbox%2F17479230%2F324621dcef17745896ea26df40709505%2FCover%20image.png?generation=1765439520899490&alt=media)

---

## 🚀 Why It Matters

In early-stage product design, founders, designers, or developers often sketch UI ideas quickly—on whiteboards, napkins, notebooks, or tablets. But turning those concepts into a working website still takes hours of manual HTML/CSS development or translation into design tools like Figma.

**Sketch2Site** changes that by enabling:

- Instant prototyping from a sketch
- Faster iteration cycles
- Lower barrier to entry for non-coders
- AI-native, multimodal interface development

It reduces friction in the design-to-code process by removing the need for UI translation. This is especially valuable for solo developers, early-stage founders, and students who want to bring ideas to life quickly—without deep frontend expertise.

---

## 🧐 How It Works

Sketch2Site consists of three major components:

### 1. **Frontend Interface**
- Built with React + TypeScript (using Vite)
- Provides a clean UI for uploading images
- Displays the generated HTML/CSS in a code editor
- Shows a live preview of the generated webpage
- Allows users to copy or further modify the generated code

### 2. **Gemini 3 Pro Integration (Model Layer)**
- The uploaded sketch image is sent as input to Gemini 3 Pro with a custom prompt
- Gemini’s multimodal capabilities interpret the structure, layout, and elements (e.g., headers, buttons, text boxes) from the image
- Gemini uses its advanced reasoning to infer responsive layout and semantic tags
- It then generates HTML and CSS code that reproduces the design concept in a browser-friendly form

### 3. **Service Layer**
- Contains helper functions to handle Gemini API requests
- Prepares prompts, encodes images, and receives structured code output
- Can run inside Google AI Studio with Gemini built-in or locally using an API key

![Architecture](https://www.googleapis.com/download/storage/v1/b/kaggle-user-content/o/inbox%2F17479230%2F8e0341825f13ef5cb8a8b57b807d6888%2FArchitecture%20diagram.png?generation=1765439873842381&alt=media)

---

## 🤖 What Gemini 3 Pro Does

Gemini is the core intelligence behind Sketch2Site. Here's how its features come into play:

- **Vision Understanding**: Detects UI layout, components, and spatial structure from a hand-drawn image
- **Natural Language Reasoning**: Infers semantic intent—like knowing that a rectangle with a line inside is likely a button or a navigation bar
- **Code Generation**: Outputs production-grade HTML and CSS that matches the interpreted design
- **Multimodal Prompt Handling**: Accepts both image + prompt text, allowing more accurate, context-aware code generation

Without Gemini’s multimodal understanding and reasoning, building this kind of image-to-code experience would require complex custom computer vision and heuristic logic.

---

## ➡️ User Flow

1. User uploads a sketch image (e.g., photo of a wireframe)
2. The image is sent to Gemini 3 Pro along with a natural prompt
3. Gemini analyzes the image and generates HTML/CSS
4. The app displays the generated code and renders a live webpage preview
5. The user can copy, edit, or deploy the result

---

## 📄 Technology Stack

- **Frontend**: React (TypeScript), Vite
- **Styling**: Tailwind CSS (or custom CSS from Gemini)
- **AI Model**: Gemini 3 Pro (multimodal vision + text)
- **Environment**: Google AI Studio Build
- **Local Option**: `.env.local` setup for `GEMINI_API_KEY` if running outside AI Studio

---

## 🌍 Real-World Use Cases

- Startup founders sketching MVP interfaces
- Product designers turning wireframes into quick previews
- Educators and students demonstrating UI/UX flows
- Hackathon builders prototyping apps on the fly
- Developers generating HTML/CSS boilerplate from concepts

---

## 🎯 Project Goals

Our goal was to show how far Gemini 3 Pro can push the idea of AI-native development—where visual creativity and reasoning combine into instant code. Instead of filling out forms, clicking templates, or using WYSIWYG editors, Sketch2Site lets you start with your imagination—and have the AI do the hard coding.

> It’s "vibe coding" in its purest form: **you sketch, Gemini builds.**

---

## ✨ Why It’s Unique

Unlike basic OCR tools or static image classifiers, Sketch2Site:

- Uses Gemini’s vision + reasoning + code in a single loop
- Understands UI structure, not just drawing lines
- Writes responsive HTML/CSS, not just code snippets
- Runs fully inside AI Studio, no server or backend needed
- Delivers an end-to-end experience: **sketch → code → preview**

---

## 🏁 Final Output

The end result is a live web app where anyone can:

- Upload a sketch
- See their interface appear as a live webpage
- Edit, tweak, or copy the code
- Build UI ideas faster, smarter, and visually

---

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1TN39eueCADGyalL2yKN7xZCyCFqctJyG

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
