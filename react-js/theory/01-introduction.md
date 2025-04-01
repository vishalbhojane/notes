- React is a JavaScript library for building user interfaces.
- It is created & maintained by Facebook.
- It is an open-source, component based library.
- React is used to build single page applications.
- ReactJS uses virtual DOM based mechanism to fill in data (views) in HTML DOM.

## React's core concepts:

- Components: Reusable UI elements
- JSX: Syntax extension for JavaScript
- Virtual DOM: Lightweight copy of the actual DOM
- One-way data flow: Data flows down, actions flow up
- State and Props: Manage and pass data in components

## React ecosystem:

- React Router for routing
- State management libraries (Redux, MobX)
- Next.js for server-side rendering
- React Native for mobile development

Node.js and npm:

- Install Node.js (includes npm)
- Verify installation: `node -v` and `npm -v`

## Setup

Create React App:

```bash
npx create-react-app my-app
cd my-app
npm start
```

React Project with Typescript

```bash
npx create-react-app my-app --template typescript
```

To add TypeScript to an existing Create-React-App project, install the below things

```bash
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

Project structure:

- src/: Source files (components, styles)
- public/: Static assets (index.html, images)
- package.json: Dependencies and scripts
- README.md: Project documentation
