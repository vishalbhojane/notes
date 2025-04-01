- React Native is a framework for building cross-platform mobile applications.
- It's created and maintained by Facebook, based on React.
- React Native allows you to build mobile apps using JavaScript and React.
- It provides a way to develop for both iOS and Android using a single codebase.
- React Native uses native components instead of web components as building blocks.

## React Native's core concepts:

- Components: Reusable UI elements (both built-in and custom)
- JSX: Syntax extension for JavaScript (same as React)
- Bridge: Connects JavaScript thread with native modules
- Native Modules: Access platform-specific APIs
- Flexbox: For responsive layouts

## React Native ecosystem:

- React Navigation for routing and navigation
- State management libraries (Redux, MobX)
- Expo for rapid development and easy deployment
- Native CLI for more control and custom native modules

## Setup

```url
https://reactnative.dev/docs/set-up-your-environment

Android Studio, Node, NPM, React Native CLI
```

Node.js and npm:

- Install Node.js (includes npm)
- Verify installation: `node -v` and `npm -v`

React Native CLI:

```bash
npm install -g react-native-cli
```

## Creating a new React Native project

```bash
npx react-native init MyApp
cd MyApp
npx react-native run-android  # For Android
npx react-native run-ios      # For iOS (Mac only)
```

React Native with TypeScript:

```bash
npx react-native init MyApp --template react-native-template-typescript
```

## Project structure:

- src/: Source files (components, screens)
- android/: Android-specific files
- ios/: iOS-specific files
- package.json: Dependencies and scripts
- App.js or App.tsx: Main application component
- index.js: Entry point of the app

## Key differences from React:

- Uses native components instead of HTML elements
- Styling is done using JavaScript objects, not CSS
- No browser APIs available; uses React Native APIs instead
- Platform-specific code may be necessary for some features
