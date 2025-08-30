## Basics

### What is React Native?

React Native is an **open-source framework** created by Facebook.
It allows developers to build **mobile applications** for **iOS and Android** using **JavaScript and React**.  
Instead of rendering to the browser DOM (like React.js), React Native renders to **native mobile components** (e.g., `<View>` instead of `<div>`).

```tsx
import React from 'react';
import {Text, View} from 'react-native';

const App = () => (
  <View>
    <Text>Hello, React Native!</Text>
  </View>
);

export default App;
```

---

## Difference between React and React Native

| Feature            | React.js (Web)             | React Native (Mobile)                      |
| ------------------ | -------------------------- | ------------------------------------------ |
| Platform           | Web applications           | iOS & Android apps                         |
| Rendering          | Uses **HTML, CSS, DOM**    | Uses **native mobile components**          |
| Styling            | CSS, styled-components     | React Native **StyleSheet API**            |
| Navigation         | React Router               | React Navigation / Native Navigation       |
| Animations         | CSS animations             | React Native Animated / Reanimated         |
| Access to hardware | Limited (via browser APIs) | Direct access to device APIs (Camera, GPS) |

---

### Advantages of React Native

- **Cross-platform**: Write once, run on both iOS & Android.
- **Hot Reload / Fast Refresh**: Instant feedback during development.
- **Access to native APIs**: via bridges (Camera, Push Notifications, etc.).
- **Cost & time efficient**: single codebase instead of two teams.
- **Large ecosystem & community support**.

### Disadvantages of React Native

- **Performance overhead**: Not as fast as fully native apps (because of JavaScript bridge).
- **Complex animations**: Can lag if not optimized.
- **Native modules dependency**: Sometimes you need to write platform-specific code in Swift/Objective-C (iOS) or Java/Kotlin (Android).
- **Upgrading issues**: Breaking changes in React Native versions.
- **Larger app size compared to native apps**.

---

### Core Components of React Native

React Native provides built-in core components that map directly to native UI components.

**Basic Components:**

- **`<View>`**: Like a `<div>` (container).
- **`<Text>`**: Display text.
- **`<Image>`**: Show images.
- **`<TextInput>`**: Input field.
- **`<ScrollView>`**: Scrollable container.
- **`<StyleSheet>`**: Styling system.

**User Interaction:**

- **`<Button>`**: Simple button.
- **`<TouchableOpacity>`, `<TouchableHighlight>`**: Tappable elements.

**Lists:**

- **`<FlatList>`**: Optimized list rendering.
- **`<SectionList>`**: Grouped list rendering.

**Example:**

```tsx
import React from 'react';
import {View, Text, Button, FlatList} from 'react-native';

const App = () => {
  const data = [
    {id: '1', name: 'Vishal'},
    {id: '2', name: 'React Native'},
  ];

  return (
    <View>
      <Text>Hello React Native</Text>
      <Button title="Click Me" onPress={() => alert('Clicked!')} />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default App;
```

---

### Performance Issues in React Native

| Performance Issue                                   | Solution                                                                                 |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Large lists rendering (FlatList not optimized).     | Use FlatList with getItemLayout, pagination, removeClippedSubviews.                      |
| Unnecessary re-renders (inefficient state updates). | Use React.memo, useCallback, useMemo.                                                    |
| Heavy animations (JavaScript thread gets blocked).  | Use react-native-reanimated or native driver.                                            |
| Bridge bottleneck (too many JS ↔ Native calls).     | Minimize heavy computations on JS thread, offload to native modules or background tasks. |
| Image performance issues.                           | Use react-native-fast-image, proper caching, compressed assets.                          |

**Example:**

```tsx
<FlatList
  data={data}
  renderItem={({item}) => <Text>{item.name}</Text>}
  keyExtractor={item => item.id}
  initialNumToRender={10}
  maxToRenderPerBatch={5}
  windowSize={5}
/>
```

---

## Virtual DOM

### How does React Native run in the background?

React Native apps run with multiple threads to handle work separately:

- **JavaScript thread**: Executes your React/JS code.
- **Native thread(s)**: Render UI using native components (iOS: UIKit, Android: Views).
- **Bridge**: Communication layer between JS and Native.

👉 Unlike a web app, React Native does not run inside a browser. Instead, the JS code is executed by a JavaScript engine (Hermes, JSC) in a separate thread and interacts with the native layer.
✅ This separation allows React Native apps to update the UI smoothly while handling logic in background threads.

---

### What is Virtual DOM and how does it work in the background?

Virtual DOM (VDOM):

- A lightweight in-memory representation of the actual UI.
- It’s just a JS object tree describing the UI components.

How it works:

1. You write JSX → React builds a Virtual DOM tree.
2. On state/prop change → React creates a new VDOM tree.
3. React compares the new tree with the old one (Diffing algorithm).
4. Only the changed parts are updated in the Real DOM (Web) or Native UI (React Native).

👉 In React Native, the VDOM is not mapped to HTML DOM, but to native views via the bridge.

Example Flow:

```tsx
// JSX
<View>
  <Text>Hello</Text>
</View>

// Virtual DOM tree (Simplified)
{
  type: "View",
  children: [
    { type: "Text", text: "Hello" },
  ],
}
```

---

### What is the process of reconciliation in React Native?

**Reconciliation** = The process React uses to determine what changes to apply to the UI when state/props change.

Steps:

1. React builds a new Virtual DOM tree.
2. Compares it with the previous Virtual DOM tree (diffing).
3. Identifies minimal changes (e.g., if only text changed, not entire view).
4. Updates only those parts in the native UI layer.

👉 This makes React Native efficient, as it avoids re-rendering the full UI.

```tsx
<Text>{count}</Text>

// When count changes from 1 → 2
// Old VDOM: { type: "Text", children: ["1"] }
// New VDOM: { type: "Text", children: ["2"] }
// Reconciliation: Only text node is updated, not the entire <Text> component.
```

---

### How is Virtual DOM better compared to Real DOM and Shadow DOM?

| Concept     | Description                                                        | Problem                                                   | Improvement              |
| ----------- | ------------------------------------------------------------------ | --------------------------------------------------------- | ------------------------ |
| Real DOM    | Actual UI DOM tree (web browsers).                                 | Updating large trees is slow (repaint/reflow).            | ❌ Inefficient.          |
| Virtual DOM | Lightweight JS representation of UI.                               | Updates happen in memory, then batched to real/native UI. | ✅ Faster than real DOM. |
| Shadow DOM  | A scoped DOM used in Web Components (isolated styles & structure). | Doesn’t optimize rendering, just encapsulation.           | Different purpose.       |

👉 Virtual DOM is faster than Real DOM because it minimizes direct DOM mutations by batching updates.
👉 In React Native, instead of touching browser DOM, updates are sent to native UI components, making it even more efficient.

---

### What are the threads in React Native?

React Native uses 3 main threads:

JavaScript Thread (JS Thread):

- Runs app logic (React code, API calls, state updates).
- Executes on JavaScriptCore or Hermes engine.
- Runs asynchronously, separate from UI rendering.

Shadow Thread:

- Handles layout calculations (using Yoga layout engine – Flexbox-based).
- Calculates positions & sizes of components.
- Runs in background → avoids blocking UI thread.

Main/UI Thread:

- Responsible for rendering native UI components (Android Views / iOS UIKit).
- Handles user interactions (touches, gestures).

Flow Example:

1. User clicks button → Event goes to UI thread.
2. Message sent to JS thread (via bridge).
3. JS updates state → reconciliation → new VDOM → Layout recalculated by Shadow thread.
4. Final UI update applied by UI thread.

---

## Styling

### What are the different ways to style your component in React Native?

React Native provides several ways to style components:

**Inline Styles:**

```tsx
<View style={{backgroundColor: 'red', padding: 10}} />
```

**StyleSheet:**

```tsx
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 10,
  },
});
```

**Array of styles:**

```tsx
<View style={[styles.container, styles.text]} />
```

**External libraries:**

- **`styled-components/native`**: Styling library.
- **`tailwind-rn` / `nativewind`**: Utility-first styling.

```tsx
import {styled} from 'nativewind';
const Title = styled(Text, 'text-2xl font-bold');

<Title>Hello</Title>;
```

```tsx
import styled from 'styled-components/native';

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

<Title>Hello</Title>;
```

---

### What is the difference between StyleSheet and inline styles?

StyleSheet is more efficient because it caches styles and avoids unnecessary re-renders.

---

### How to handle element size according to different screens in React Native?

Mobile devices have different screen sizes & pixel densities → responsiveness is key.

Ways to handle:

**Flexbox (preferred) → Use flex, flexDirection, justifyContent, alignItems.**

```tsx
<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  <Text>Centered!</Text>
</View>
```

**Percentage-based width/height**

```tsx
<View style={{width: '80%', height: '50%'}} />
```

**Dimensions API → Get device width & height.**

```tsx
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
<View style={{width: width / 2, height: height / 3}} />;
```

**PixelRatio API → Handle different pixel densities.**

```tsx
import {PixelRatio} from 'react-native';
const fontScale = PixelRatio.getFontScale();
const devicePixelDensity = PixelRatio.get();

const adjustedFontSize = fontScale * 16;
const adjustedWidth = PixelRatio.roundToNearestPixel(100 * devicePixelDensity);

<View style={{width: adjustedWidth, height: adjustedWidth}}>
  <Text style={{fontSize: adjustedFontSize}}>Hello</Text>
</View>;
```

**Responsive libraries**

- **`react-native-responsive-screen`** (e.g., wp, hp).
- **`react-native-size-matters`**.

✅ Best practice: Use flexbox & percentages for layout, only use Dimensions when needed (e.g., for modals).

---

### Flexbox in browser vs Flexbox in React Native

React Native uses a subset of CSS Flexbox, but with some differences:

| Feature              | Browser (Web)           | React Native (Mobile)                   |
| -------------------- | ----------------------- | --------------------------------------- |
| Default direction    | `row`                   | `column` (vertical)                     |
| Supported properties | Most of CSS flexbox     | Subset (no `gap`, no `flex-basis:auto`) |
| Units                | px, %, em, rem          | Only number (dp) or %                   |
| Display property     | `display: flex;` needed | All RN Views are flex by default        |

Example:

```tsx
<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
  <Text>Hello</Text>
</View>
```

---

### What does `StyleSheet.create()` function do?

`StyleSheet.create()` is a helper that validates and freezes styles for better performance.
It ensures styles are immutable and mapped to numeric IDs internally, making them faster to reference at runtime.

Example:

```tsx
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 10,
  },
  text: {
    color: 'white',
  },
});

// Using numeric IDs internally:
<View style={styles.container}>
  <Text style={styles.text}>Hello</Text>
</View>;
```

✅ Advantage:

- Performance optimization (compared to inline styles).
- Early error detection (invalid style props will throw warning).

---

### What are the naming conventions of style properties?

In React Native, style properties follow camelCase (not kebab-case). e.g

| CSS (Web)        | React Native    |
| ---------------- | --------------- |
| background-color | backgroundColor |
| font-size        | fontSize        |
| text-align       | textAlign       |
| z-index          | zIndex          |

✅ Key points:

- Always use camelCase.
- Units: only numbers (interpreted as density-independent pixels, dp).
- `%` is supported for width/height, not for font sizes.
- No support for CSS shorthands (e.g., `margin: 10 20` won’t work).

---

## View Components

### What are touchable components in React Native?

Touchable components handle **press/tap interactions** (since React Native doesn’t use `<button>`).

Common ones:

- **`TouchableOpacity`** → Reduces opacity when pressed.
- **`TouchableHighlight`** → Darkens background when pressed.
- **`TouchableWithoutFeedback`** → No feedback, just press handling.
- **`Pressable`** → Newer, more powerful replacement (supports hover, longPress, etc.).

```tsx
<TouchableOpacity onPress={() => alert('Pressed!')}>
  <Text>Click Me</Text>
</TouchableOpacity>
```

---

### What is Flexbox in React Native?

- Flexbox is the **default layout system** in React Native.
- It arranges children in **row or column**.
- More consistent than web CSS, since RN **always uses Flexbox** (no block/inline).

---

### What are the properties of Flexbox in React Native?

- **Container properties**:
  - `flexDirection` → `row` / `column` (default = column)
  - `justifyContent` → main axis alignment (flex-start, center, space-between, space-around, space-evenly)
  - `alignItems` → cross axis alignment (flex-start, center, flex-end, stretch)
  - `alignContent` → controls multi-line content (only if flexWrap: 'wrap')
  - `flexWrap` → whether children wrap or not (`nowrap`, `wrap`).
- **Child properties**:
  - `flex` → how much space child should take.
  - `alignSelf` → overrides `alignItems` for a single child.

---

### How does alignItems and justifyContent work when Flex direction is row?

- **Main axis** → Horizontal (row).
- **Cross axis** → Vertical (column).
- `justifyContent` → Horizontal alignment.
- `alignItems` → Vertical alignment.

```tsx
<View
  style={{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  }}
>
  <Text>A</Text>
  <Text>B</Text>
</View>
```

Here

- Children are horizontally centered.
- Vertically aligned at bottom (flex-end).

---

### What is the difference between alignItems and alignContent?

- **alignItems:** Aligns children **along cross-axis** (single line).
- **alignContent:** Aligns **multiple lines** of content (only works with `flexWrap: 'wrap'`).

**Example:**

```tsx
// alignItems affects children in one line
<View style={{ flexDirection: 'row', alignItems: 'center' }} />

// alignContent affects spacing between lines
<View style={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'space-between' }} />
```

---

### What does flexWrap mean?

- Determines if children should wrap to the next line.
- Values:
  - `nowrap` (default) → All in one line.
  - `wrap` → Wraps to next line if not enough space.

**Example:**

```tsx
<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
  <Text>Box 1</Text>
  <Text>Box 2</Text>
  <Text>Box 3</Text>
</View>
```

---

### What are pure components in React Native?

- **PureComponent** is like React’s **Component**, but it implements **shallow comparison of props & state**.
- Prevents unnecessary re-renders → better performance.

**Example:**

```tsx
import React, {PureComponent} from 'react';
class MyComponent extends PureComponent {
  render() {
    return <Text>{this.props.name}</Text>;
  }
}
```

✅ Best for functional UI that doesn’t change often.

---

### What is meant by display flex?

- In React Native, **all components are flex containers by default**.
- Unlike web, you don’t need `display: flex`.
- Every `<View>` or `<Text>` arranges children using Flexbox automatically.

---

### What is KeyboardAvoidingView?

- A wrapper component that **automatically moves UI elements up** when the keyboard opens (common in forms).
- Prevents text inputs from being hidden behind the keyboard.

**Example:**

```tsx
<KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
  <TextInput placeholder="Type here" />
</KeyboardAvoidingView>
```

---

### What is VirtualizedList?

- A **base class** for list rendering in React Native.
- `FlatList` and `SectionList` are built on top of `VirtualizedList`.
- Optimizes rendering of long lists by only rendering visible items + some buffer.

**Example:**

```tsx
<VirtualizedList
  data={data}
  initialNumToRender={10}
  getItem={(data, index) => data[index]}
  getItemCount={data => data.length}
  renderItem={({item}) => <Text>{item}</Text>}
/>
```

---

### ListView in React Native.

- **ListView** was the old way to render lists (before RN 0.43).
- Deprecated in favor of `FlatList` and `SectionList`.
- Should not be used in modern RN apps.

---

### What is the difference between an element and a component?

**Element** → A plain object describing what to render (immutable).

```tsx
const element = <Text>Hello</Text>;
```

**Component** → A function or class that returns elements.

```tsx
const MyComponent = () => <Text>Hello</Text>;
```

👉 Think: _Element is what you see, Component is the recipe to create elements._

---

### Are all components used in React used in React Native as well?

- ❌ No. React Native does not use **HTML elements** like `<div>`, `<span>`, `<p>`.
- ✅ Instead, it provides **native components**: `<View>`, `<Text>`, `<Image>`.
- React hooks (useState, useEffect, etc.) work the same.
- Some React web libraries (like React Router) don’t work; instead we use RN-specific ones (React Navigation).

---

## FlatList

### FlatList in React Native and its advantages over ListView

- **FlatList** is a performant component for rendering **large lists** of data in React Native.
- It renders only the **items visible on screen + a buffer**, instead of rendering everything at once.
- **ListView** was the old list component (deprecated) and was less efficient.

✅ **Advantages over ListView:**

- More performant (virtualized rendering).
- Easier API.
- Built-in support for pull-to-refresh, separators, empty states.
- Supports both **vertical & horizontal** lists.

---

### What are the key features of FlatList?

- Virtualized rendering (renders only visible items).
- Supports **horizontal/vertical scrolling**.
- Accepts custom components for items.
- Props for performance tuning (`initialNumToRender`, `windowSize`, `removeClippedSubviews`).
- Built-in support for:
  - `ItemSeparatorComponent` (dividers).
  - `ListEmptyComponent` (when no data).
  - `ListHeaderComponent` & `ListFooterComponent`.
- Supports **pull-to-refresh** (`refreshing`, `onRefresh`).

**Example:**

```tsx
<FlatList
  data={[
    {id: '1', name: 'Vishal'},
    {id: '2', name: 'React Native'},
  ]}
  keyExtractor={item => item.id}
  renderItem={({item}) => <Text>{item.name}</Text>}
  ItemSeparatorComponent={() => (
    <View style={{height: 1, backgroundColor: '#ccc'}} />
  )}
/>
```

---

### Do we need a ScrollView while using FlatList?

- ❌ No, FlatList already provides **scrolling** functionality.
- Wrapping FlatList in a ScrollView defeats its purpose → it would **render all items** and break virtualization (bad for performance).

👉 Only use `ScrollView` inside FlatList items if you need nested scrolls.

---

### How to re-render a FlatList?

Ways to trigger FlatList re-render:

**Change `data` prop** (most common).

```tsx
const [list, setList] = useState([]);
<FlatList data={list} renderItem={...} /> // Updating state triggers re-render setList([...list, {id: '3', name: 'New Item'}]);
```

**Use `extraData` prop** → Tells FlatList to check for updates beyond `data`.

```tsx
<FlatList data={list} extraData={selectedId} renderItem={...} />
```

---

### FlatList advantages over ScrollView

- **FlatList:**
  - Virtualized → renders only visible items.
  - Good for large datasets (hundreds/thousands).
  - More memory-efficient.
- **ScrollView:**
  - Renders **all items at once** → can cause performance issues for large lists.
  - Better only for **small lists** or fixed content.

✅ Rule: Use **FlatList for dynamic/large data**, **ScrollView for small static content**.

---

### Can a FlatList render data horizontally?

- ✅ Yes, set `horizontal={true}`.

**Example:**

```tsx
<FlatList
  data={[
    {id: '1', name: 'A'},
    {id: '2', name: 'B'},
  ]}
  keyExtractor={item => item.id}
  renderItem={({item}) => <Text>{item.name}</Text>}
  horizontal
/>
```

---

### When would you use a ScrollView over a FlatList?

- Use **ScrollView** when:
  - Content is **small & static** (e.g., form, settings page).
  - You don’t need virtualization.
  - You want to render **all children at once**.
- Use **FlatList** when:
  - Data is large/dynamic.
  - You need lazy loading, infinite scroll, or pull-to-refresh.

---

### What does `ItemSeparatorComponent` do in React Native?

- A prop in FlatList that renders a **separator between list items**.
- Usually used for dividers or spacing.

**Example:**

```tsx
<FlatList
  data={['A', 'B', 'C']}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({item}) => <Text>{item}</Text>}
  ItemSeparatorComponent={() => (
    <View style={{height: 1, backgroundColor: 'gray'}} />
  )}
/>
```

---

## State and Props

### What are states?

- **State** is a **mutable data object** that represents the current situation of a component.
- When state changes → component **re-renders**.
- Used for **dynamic data** (like user input, toggle, counters, API response).

**Example (Functional Component):**

```tsx
import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <View>
      <Text>{count}</Text>{' '}
      <Button title="Increment" onPress={() => setCount(count + 1)} />
    </View>
  );
};
```

---

### What are props?

- **Props (properties)** are **read-only inputs** passed from a parent to a child component.
- Used for **data flow between components**.
- Immutable (cannot be modified inside child).

**Example:**

```tsx
const Greeting = ({name}) => <Text>Hello {name}</Text>;
<Greeting name="Vishal" />;
```

---

### Differences between state and props

| Feature    | State (Internal)                                   | Props (External)                  |
| ---------- | -------------------------------------------------- | --------------------------------- |
| Definition | Mutable data owned by component                    | Read-only data passed from parent |
| Update     | Updated inside component (`setState` / `useState`) | Cannot be modified by child       |
| Lifecycle  | Maintained by component itself                     | Controlled by parent              |
| Usage      | For UI changes, local data                         | For reusability, communication    |

---

### What are default props in React Native and why are they necessary?

- **Default props** provide fallback values when parent does not pass a prop.
- Prevents errors and ensures component stability.

**Example:**

```tsx
const Greeting = ({name}) => <Text>Hello {name}</Text>;
Greeting.defaultProps = {name: 'Guest'};
```

**Why necessary?**

- Avoids `undefined` errors.
- Makes components reusable with sensible defaults.

---

### What are props drilling?

- **Props drilling** = Passing props through multiple nested components just to reach a deeply nested child.
- Problem: Makes code harder to maintain, increases coupling.

**Example:**

```tsx
const App = () => <Parent user="Vishal" />;
const Parent = ({user}) => <Child user={user} />;
const Child = ({user}) => <Text>{user}</Text>;
```

Here, `user` is drilled through multiple levels.

---

### How can we avoid props drilling in React Native?

✅ **Solutions:**

**React Context API**

```tsx
const UserContext = React.createContext();
const App = () => (
  <UserContext.Provider value="Vishal">
    <Parent />
  </UserContext.Provider>
);
const Child = () => {
  const user = React.useContext(UserContext);
  return <Text>{user}</Text>;
};
```

**State Management Libraries**

- Redux, Zustand, Recoil, MobX.

---

### How do you update the state of a component (class and functional)?

**Class Component:**

```tsx
class Counter extends React.Component {
  state = {count: 0};
  increment = () => this.setState({count: this.state.count + 1});
  render() {
    return <Text>{this.state.count}</Text>;
  }
}
```

**Functional Component:**

```tsx
const [count, setCount] = useState(0);
setCount(prev => prev + 1);
```

👉 **Important:** Never mutate state directly (❌ `this.state.count++`), always use `setState` / `useState`.

---

### How do you pass props between components?

**Parent → Child:**

```tsx
const Child = ({name}) => <Text>{name}</Text>;
<Child name="Vishal" />;
```

**Child → Parent (via callback):**

```tsx
const Child = ({onSend}) => (
  <Button title="Send" onPress={() => onSend('Hello from child')} />
);
const Parent = () => {
  const handleMessage = msg => alert(msg);
  return <Child onSend={handleMessage} />;
};
```

---

### What is setNativeProps?

- A method to **directly update a component’s native properties** without going through React’s re-render cycle.
- Useful for performance optimization in cases like animations, frequent updates, focus.

**Example:**

```tsx
import React, {useRef} from 'react';
import {TextInput, Button} from 'react-native';
const App = () => {
  const inputRef = useRef();
  const updateValue = () => {
    inputRef.current.setNativeProps({text: 'Updated directly!'});
  };
  return (
    <>
      <TextInput ref={inputRef} style={{borderWidth: 1}} />
      <Button title="Update" onPress={updateValue} />
    </>
  );
};
```

👉 **Caution:**

- `setNativeProps` bypasses React’s state system.
- Use only for **performance optimizations** (e.g., avoiding re-render in animations).

---

## Components

### What are the different ways of writing a component in React Native?

✅ Two main ways:

**Class-based Component** (older, before Hooks)

```tsx
import React, {Component} from 'react';
import {Text, View} from 'react-native';
class Greeting extends Component {
  render() {
    return <Text>Hello {this.props.name}</Text>;
  }
}
```

**Functional Component** (modern, preferred)

```tsx
import React from 'react';
import {Text, View} from 'react-native';
const Greeting = ({name}) => <Text>Hello {name}</Text>;
```

Nowadays, **functional components + hooks** are the recommended standard.

### Difference between class-based and functional components

| Feature           | Class Component               | Functional Component     |
| ----------------- | ----------------------------- | ------------------------ |
| Syntax            | ES6 class                     | JavaScript function      |
| State Management  | `this.state`, `this.setState` | `useState`, `useReducer` |
| Lifecycle Methods | `componentDidMount`, etc.     | `useEffect`              |
| Performance       | Slightly heavier              | Lighter, faster          |
| Recommended Today | ❌ Legacy                     | ✅ Preferred             |

---

### What are Stateful and Stateless components?

- **Stateful Component**:
  - Has its own state (data can change).
  - Example: Counter, Form, Toggle Switch.
    ```tsx
    const Counter = () => {
      const [count, setCount] = React.useState(0);
      return <Text>{count}</Text>;
    };
    ```
- **Stateless Component**:
  - Does not manage state, only displays data via **props**.
  - Example: Button, Label, Display-only component.
    ```tsx
    const Greeting = ({name}) => <Text>Hello {name}</Text>;
    ```

👉 **Note:** With Hooks, “stateless functional components” can now be **stateful too**, so this distinction is more historical.

---

### What are controlled and uncontrolled components?

- **Controlled Component**
  - Form input values are **controlled by React state**.
  - Always reflect the state.
  - Example:
    ```tsx
    const App = () => {
      const [text, setText] = React.useState('');
      return (
        <TextInput
          value={text}
          onChangeText={setText}
          style={{borderWidth: 1}}
        />
      );
    };
    ```
- **Uncontrolled Component**
  - Input stores its own value internally.
  - Accessed via `ref` instead of state.
  - Example:
    ```tsx
    const App = () => {
      const inputRef = React.useRef();
      const showValue = () => alert(inputRef.current._lastNativeText);
      return (
        <>
          <TextInput ref={inputRef} style={{borderWidth: 1}} />
          <Button title="Show Value" onPress={showValue} />
        </>
      );
    };
    ```

📌 **Key Difference**:

- Controlled = Single source of truth is **React State**.
- Uncontrolled = Value stored internally in the **DOM/native component**.

---

## Class Components

### What are class components in React Native?

- **Definition**: A **class component** is an ES6 class that extends `React.Component`.
- It can **hold state**, define **lifecycle methods**, and must implement a `render()` method that returns JSX.

✅ Example:

```tsx
import React, {Component} from 'react';
import {Text, View} from 'react-native';
class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {name: 'Vishal'};
  }
  render() {
    return (
      <View>
        <Text>Hello, {this.state.name}</Text>
      </View>
    );
  }
}
export default Welcome;
```

---

### Explain the lifecycle of a class component.

A class component goes through **3 lifecycle phases**:

#### 🔹 Mounting (when component is created & inserted into the tree)

- `constructor()` → Initialize state & bind methods.
- `static getDerivedStateFromProps()` → Sync state with props before render.
- `render()` → Returns JSX to display.
- `componentDidMount()` → Runs after render (good for API calls, subscriptions).

#### 🔹 Updating (when props/state change)

- `static getDerivedStateFromProps()` → Again called when props change.
- `shouldComponentUpdate()` → Decide whether to re-render (performance).
- `render()` → Re-render UI.
- `getSnapshotBeforeUpdate()` → Capture values before DOM updates (e.g. scroll position).
- `componentDidUpdate()` → Called after update (good for side effects).

#### 🔹 Unmounting (when component is removed)

- `componentWillUnmount()` → Cleanup (unsubscribe, clear timers).

✅ Example lifecycle usage:

```tsx
class Demo extends Component {
  componentDidMount() {
    console.log('Mounted');
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('Updated');
  }
  componentWillUnmount() {
    console.log('Unmounted');
  }
  render() {
    return <Text>Lifecycle Demo</Text>;
  }
}
```

---

### For what reason is the `render()` method used inside a class component?

- Every class component must implement `render()`.
- It **returns JSX** (UI) that should be displayed.
- It should be **pure**:
  - No side effects (like API calls, timers, etc.).
  - Just transform `props` + `state` → into UI.

---

### When is the constructor method called inside the class component?

- The `constructor()` is called **before the component is mounted**.
- Used for:
  - Initializing state (`this.state = {...}`).
  - Binding event handlers (`this.method = this.method.bind(this)`).

✅ Example:

```tsx
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
    this.increment = this.increment.bind(this);
  }
  increment() {
    this.setState({count: this.state.count + 1});
  }
  render() {
    return <Text onPress={this.increment}>{this.state.count}</Text>;
  }
}
```

---

### In which case would you prefer a class component over a functional component?

- **Today** → Rarely. Functional components with hooks cover almost all cases.
- **You’d prefer class components if**:
  - Working on an **old codebase** (before Hooks in React 16.8).
  - You need **error boundaries** (still class-only).
  - You’re maintaining legacy code that uses lifecycle methods instead of `useEffect`.

👉 In modern React Native projects, **functional components are preferred** because:

- Cleaner syntax.
- Hooks replace lifecycle methods.
- Easier state management.
- Better performance.

---

## Functional Components

### What are functional components in React Native?

- Functional components are **JavaScript functions** that return JSX (UI).
- Unlike class components, they don’t extend `React.Component`.
- Before React 16.8, they were **stateless + dumb** (only presentational).
- After **Hooks**, functional components can:
  - Hold **state** (`useState`)
  - Handle **side effects** (`useEffect`)
  - Use **context** (`useContext`)
  - Use lifecycle equivalents.

✅ Example:

```tsx
import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <View>
      {' '}
      <Text>Count: {count}</Text> <Button
        title="+"
        onPress={() => setCount(count + 1)}
      />{' '}
    </View>
  );
};
export default Counter;
```

---

### Do functional components have a lifecycle on their own?

- No. Functional components **don’t have lifecycle methods** like `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`.
- Instead, **React Hooks** (`useEffect`, `useLayoutEffect`) allow you to replicate lifecycle behavior.

---

### How do functional components manage lifecycle changes happening in class components?

Lifecycle equivalence between **class components vs functional components**:

| **Class Component**     | **Functional Component (Hooks)**           |
| ----------------------- | ------------------------------------------ |
| `componentDidMount`     | `useEffect(() => { ... }, [])`             |
| `componentDidUpdate`    | `useEffect(() => { ... }, [dependencies])` |
| `componentWillUnmount`  | Cleanup function inside `useEffect`        |
| `shouldComponentUpdate` | `React.memo` + `useMemo` + `useCallback`   |

✅ Example (replicating lifecycle):

```tsx
import React, {useEffect} from 'react';
import {Text} from 'react-native';
const Demo = () => {
  useEffect(() => {
    console.log('Mounted'); // componentDidMount
    return () => {
      console.log('Unmounted'); // componentWillUnmount
    };
  }, []);
  return <Text>Hello</Text>;
};
```

---

### What are pure functional components?

- A **pure functional component** is one that:
  - Given the **same props & state**, always renders the **same output**.
  - Has **no side effects** during rendering.
- React provides `React.memo` HOC to make functional components **pure** by preventing unnecessary re-renders.

✅ Example:

```tsx
const Greeting = ({name}) => {
  console.log('Rendered:', name);
  return <Text>Hello {name}</Text>;
}; // Pure component - only re-renders if props change
export default React.memo(Greeting);
```

---

### Will React Hooks work in class components?

- ❌ **No.** Hooks **only work in functional components**.
- Class components must use lifecycle methods and `this.state` / `this.setState`.
- Reason: Hooks rely on the **call order of functions** during render, which is not possible in class components.

---

## Hooks

### 1. What are hooks?

- **Hooks are special functions** that let you use **state** and **lifecycle features** inside functional components.
- Introduced in **React 16.8**, they eliminated the need to write class components for managing state or side effects.
- Example: `useState`, `useEffect`, `useRef`, `useCallback`, etc.

---

### 2. Why were hooks brought up in React Native?

- Before hooks:
  - Functional components = **stateless, presentational only**.
  - Class components = needed for **state + lifecycle methods**.
- Problems with class components:
  - Harder to read/maintain due to `this` binding.
  - Logic scattered across lifecycle methods.
  - Poor reusability of stateful logic (had to use HOCs or render props).

✅ Hooks solve this by:

- Making functional components **stateful**.
- Allowing **logic reuse** via custom hooks.
- Simplifying **code readability**.

---

### 3. How do hooks replace the lifecycle methods of class components?

| **Class Component Lifecycle** | **Equivalent Hook**                    |
| ----------------------------- | -------------------------------------- |
| `componentDidMount`           | `useEffect(() => {...}, [])`           |
| `componentDidUpdate`          | `useEffect(() => {...}, [deps])`       |
| `componentWillUnmount`        | Cleanup in `useEffect`                 |
| `shouldComponentUpdate`       | `React.memo`, `useMemo`, `useCallback` |

✅ Example:

```tsx
useEffect(() => {
  console.log('Mounted or Updated');
  return () => console.log('Unmounted');
}, [dependency]);
```

---

### 4. **Explain `useState`, `useEffect`, `useCallback`, `useMemo`, and `useRef`.**

#### 🟦 `useState`

- Manages local state in a functional component.

```tsx
const [count, setCount] = useState(0);
setCount(count + 1);
```

---

#### 🟦 `useEffect`

- Handles **side effects** (data fetching, subscriptions, DOM changes).

```tsx
useEffect(() => {
  console.log('Runs on mount & dependency change');
  return () => console.log('Cleanup'); // unmount
}, [dependency]);
```

---

#### 🟦 `useCallback`

- Returns a **memoized function** that only changes if dependencies change.
- Prevents re-creating functions on every render (good for performance in child components).

```tsx
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
```

---

#### 🟦 `useMemo`

- Returns a **memoized value**. Useful for expensive computations.

```tsx
const expensiveValue = useMemo(() => compute(num), [num]);
```

---

#### 🟦 `useRef`

- Returns a **mutable ref object**.
- Does not trigger re-renders when updated.
- Used for DOM references or storing values across renders.

```tsx
const inputRef = useRef(null);
useEffect(() => {
  inputRef.current.focus();
}, []);
```

---

### 5. Difference between `useEffect` and `useLayoutEffect`

| **Aspect**       | **useEffect**                          | **useLayoutEffect**                               |
| ---------------- | -------------------------------------- | ------------------------------------------------- |
| Execution timing | Runs **after** paint (asynchronous).   | Runs **synchronously before** paint.              |
| Use case         | API calls, event listeners, async ops. | DOM measurements, layout adjustments, animations. |
| Performance      | Non-blocking, better for most cases.   | Blocking, use sparingly.                          |

---

### 6. What are the rules while using hooks in React Native?

- ✅ Only call hooks **at the top level** (not inside loops, conditions, or nested functions).
- ✅ Only call hooks from **React functions** (functional components or custom hooks).
- ✅ Follow naming convention: custom hooks must start with `use` (e.g., `useAuth`).

---

### 7. What are custom hooks and how can we create them?

- A **custom hook** is a reusable function that uses other hooks.
- Helps in extracting and reusing stateful logic.

✅ Example:

```tsx
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(c => c + 1);
  return {count, increment};
}
// Usage
const {count, increment} = useCounter(10);
```

---

### 8. **How can you update the current state value based on previous state value in React hooks?**

- Use the **functional update form** of `setState`.

```tsx
setCount(prev => prev + 1);
```

This ensures correctness when updates are queued asynchronously.

---

### 9. What are the differences in using hooks and state management in class components in React Native?

| **Class Components**                           | **Functional Components (Hooks)** |
| ---------------------------------------------- | --------------------------------- |
| Use `this.state` and `this.setState`.          | Use `useState` for local state.   |
| Lifecycle methods (`componentDidMount`, etc.). | `useEffect` for side effects.     |
| Harder to share logic (HOCs, render props).    | Easier with **custom hooks**.     |
| Verbose & requires binding `this`.             | Simpler, no `this`.               |
| Cannot use hooks.                              | Full power of hooks.              |

---

## Databases in React Native

### What type of database works best in React Native?

There is **no single best database** — it depends on the **app use case**:

- **For local storage (small, simple key-value):**
  - `AsyncStorage` (built-in or via `@react-native-async-storage/async-storage`).
- **For offline-first apps with sync:**
  - **Realm DB** → real-time sync, great for complex objects.
  - **WatermelonDB** → optimized for React Native, offline + sync with server.
- **For relational data:**
  - **SQLite** → structured data with queries.
- **For cloud-based apps:**
  - **Firebase (Firestore/Realtime DB)** → serverless, real-time updates.

✅ **Rule of thumb:**

- Small state/preferences → `AsyncStorage`.
- Structured relational data → `SQLite`.
- Large, offline-first → `Realm` or `WatermelonDB`.
- Cloud sync → `Firebase`.

---

### Explain AsyncStorage in React Native.

- `AsyncStorage` is a **simple, unencrypted, asynchronous key-value storage system**.
- Works like **localStorage in web** but persistent across app restarts.
- Suitable for small data (tokens, flags, preferences, cached values).

✅ Example:

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
// Save
await AsyncStorage.setItem('userToken', 'abc123');
// Get
const token = await AsyncStorage.getItem('userToken');
// Remove
await AsyncStorage.removeItem('userToken');
```

⚠️ **Limitations:**

- Not secure → stores data in plain text.
- Not suitable for large or relational datasets.

---

### How can sensitive data be stored securely in React Native?

Since `AsyncStorage` is **not secure**, for **passwords, tokens, PII** use:

- **Secure Storage Libraries:**
  - 🔒 `react-native-keychain` → stores in Keychain (iOS) / Keystore (Android).
  - 🔒 `Expo SecureStore` (if using Expo).
- **Encryption Approaches:**
  - Store encrypted values in `AsyncStorage` (using `crypto-js`).
  - Example: encrypt token before storing.
- **Best Practices:**
  - Never hardcode secrets in code.
  - Use secure storage for auth tokens.
  - For large secure DBs → use Realm with **encryption enabled**.

✅ Example with **react-native-keychain**:

```tsx
import * as Keychain from 'react-native-keychain';
// Save credentials
await Keychain.setGenericPassword('username', 'password123');
// Get credentials
const creds = await Keychain.getGenericPassword();
console.log(creds.username, creds.password);
// Delete
await Keychain.resetGenericPassword();
```

---

## Networking in React Native

### What are bridges in React Native? Why are they used?

- **Bridge = communication layer** between **JavaScript thread** and **Native (Java/Obj-C/Swift) modules**.
- Since React Native runs JS code using **JavaScriptCore** (or Hermes), the bridge allows:
  - JS → Native calls (e.g., accessing camera, Bluetooth, file system).
  - Native → JS events (e.g., push notifications, geolocation updates).

✅ **Why used?**

- React Native doesn’t have direct access to all native APIs.
- Bridge translates data into a format both sides understand (JSON-like messages).

⚡ Example:

- JS calls `fetch()` → goes through the bridge → native networking API executes request → result sent back to JS via bridge.

---

### Describe networking in React Native.

- React Native uses **same networking APIs as browsers** (mostly polyfilled):
  - **`fetch` API** → modern way to make network requests.
  - **`XMLHttpRequest (XHR)`** → older API, still supported.
  - **WebSockets** → real-time communication.
- Unlike the web, networking requests are executed by **native OS APIs** (NSURLSession on iOS, OkHttp on Android).
- Data travels JS ↔ Native via the **bridge**.

✅ Uses:

- Fetch data from REST APIs.
- Upload/download files.
- Real-time messaging via WebSockets.

---

### How to make AJAX network calls in React Native?

- **Using `fetch` (preferred):**

```tsx
// GET Request
fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// POST Request
fetch('https://api.example.com/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({username: 'vishal', password: '12345'}),
})
  .then(res => res.json())
  .then(data => console.log(data));
```

- **Using Axios (popular library):**

```tsx
import axios from 'axios';
const response = await axios.get('https://api.example.com/users');
console.log(response.data);
```

---

### What is the use of the XHR module in React Native?

- **`XMLHttpRequest (XHR)` module** provides **backward compatibility** with old AJAX-style requests.
- Internally, React Native **polyfills XHR** so libraries expecting a browser-like environment (e.g., Axios, Apollo, Firebase SDKs) still work.
- Under the hood, XHR calls go through the **React Native bridge** → executed using native networking APIs.

✅ **Use cases:**

- Supports libraries that rely on `XMLHttpRequest`.
- Helps in debugging (network inspector in React Native DevTools uses XHR tracking).

---

## Optimization in React Native

### How can you optimize the performance of images?

- **Use correct image sizes** → don’t load 2000px images if only 200px is required.
- **Use `resizeMode`** (`cover`, `contain`, `stretch`) smartly to avoid unnecessary rendering.
- **Use `Image.getSize()`** to prefetch image dimensions before rendering.
- **Lazy load images** using libraries like `react-native-fast-image`.
- **Cache images** → so reloading doesn’t require fresh downloads (e.g., FastImage or `Image.prefetch`).
- **Use CDN & WebP** → WebP format offers smaller file size compared to PNG/JPEG.

---

### How to optimize a large list in FlatList?

✅ FlatList is already optimized compared to ScrollView, but you can:

- **Use `keyExtractor`** → provide unique keys to prevent re-renders.
- **Set `initialNumToRender`** → avoid rendering all items at once.
- **Use `windowSize` & `maxToRenderPerBatch`** → control how many items render offscreen.
- **Use `getItemLayout`** → improves scroll performance when item height is fixed.
- **Avoid inline functions/components** → use `useCallback` and `React.memo`.
- **Use `removeClippedSubviews`** → unmounts items out of viewport.

---

### How can you avoid React Native multi-threading issues?

React Native has 3 main threads:

- **JS Thread** → runs React code.
- **Shadow Thread** → layout calculations (Yoga engine).
- **UI Thread (Main thread)** → rendering UI.

⚡ Issues arise if heavy tasks block the JS thread. To avoid:

- Use **InteractionManager.runAfterInteractions()** → schedule heavy tasks after UI work.
- Use **Background timers / Workers** (`react-native-workers`, `react-native-background-task`).
- Use **native modules** for CPU-intensive tasks (e.g., image processing, encryption).
- Keep JS thread **lightweight** → avoid large loops or blocking operations.

---

### Discuss ways to reduce memory leaks in apps?

- **Clear timers & intervals** in `useEffect` cleanup or `componentWillUnmount`.
- **Unsubscribe listeners** (e.g., event listeners, sockets, Firebase).
- **Avoid retaining state unnecessarily** (especially large objects/images).
- **Use FlatList cleanup** → `removeClippedSubviews`.
- **Release refs** properly (e.g., animations, video/audio).
- **Profile with tools** → Xcode Instruments, Android Studio Profiler to detect leaks.

---

### How can you cache React Native images?

- **Using `Image.prefetch()`**:

```tsx
Image.prefetch('https://example.com/my-image.jpg');
```

- **Using `react-native-fast-image` (most popular):**

```tsx
import FastImage from 'react-native-fast-image';
<FastImage
  style={{width: 200, height: 200}}
  source={{
    uri: 'https://example.com/my-image.jpg',
    priority: FastImage.priority.high,
    cache: FastImage.cacheControl.immutable,
  }}
  resizeMode={FastImage.resizeMode.cover}
/>;
```

- **Store in local storage** with libraries like:
  - `react-native-fs` (save image to file system).
  - `react-native-cached-image`.

---

## Redux in React Native

### What is meant by Redux?

Redux is a **state management library** for JavaScript apps (including React Native). It provides a **single source of truth (store)** that makes state predictable, easier to debug, and consistent across the app.

### What is meant by Flux?

Flux is an **application architecture** introduced by Facebook. It uses a **unidirectional data flow** (Actions → Dispatcher → Store → View).  
Redux is a **library that implements Flux concepts** with some improvements (like a single store instead of multiple stores).

---

### What is the difference between Redux and Flux?

| Feature     | Flux            | Redux                                 |
| ----------- | --------------- | ------------------------------------- |
| Stores      | Multiple stores | Single centralized store              |
| State       | Mutable         | Immutable (reducer returns new state) |
| Dispatcher  | Required        | Not needed (reducers handle actions)  |
| Boilerplate | More            | Less (with Redux Toolkit)             |
| Debugging   | Harder          | Easier with DevTools                  |

---

### Core principles of Redux?

1. **Single source of truth** → state is stored in a single object tree.
2. **State is read-only** → you can’t mutate it directly, must dispatch actions.
3. **Changes via pure functions** → reducers are pure functions that return new state.

---

### Difference between mapStateToProps() and mapDispatchToProps

- **mapStateToProps** → maps store state to component props.

```tsx
const mapStateToProps = state => ({user: state.user});
```

- **mapDispatchToProps** → maps dispatch actions to component props.

```tsx
const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUser(user)),
});
```

---

### What are constants?

Constants are **action type identifiers** stored in variables to avoid typos and maintain consistency.

```tsx
export const ADD_TODO = 'ADD_TODO';
```

---

### What are reducers?

Reducers are **pure functions** that take the current state and an action, then return a **new state**.

```tsx
function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
```

---

### Explain data flow in a typical application made with React Native and Redux.

1. **UI Dispatches Action** → user clicks button → `dispatch({type: "ADD_TODO"})`.
2. **Reducers Update State** → reducers take old state + action → return new state.
3. **Store Updates** → Redux store is updated.
4. **UI Rerenders** → React components subscribed via `connect()` or `useSelector` get new state.

**Flow:** _Action → Reducer → Store → UI_

---

### What is meant by store in Redux?

The store is a **JavaScript object** that holds the entire state tree of the app. It provides methods to access state, dispatch actions, and subscribe to changes.

---

### Name all the Redux store methods.

1. `store.getState()` → returns current state.
2. `store.dispatch(action)` → sends action to reducer.
3. `store.subscribe(listener)` → registers listener for state changes.
4. `store.replaceReducer(nextReducer)` → replaces reducer dynamically.

---

### How to set the initial state in Redux?

- Inside **reducer**:

```tsx
function counterReducer(state = {count: 0}, action) {
  switch (action.type) {
    default:
      return state;
  }
}
```

- Or via **preloadedState** in `createStore`:

```tsx
const store = createStore(reducer, {count: 10});
```

---

### What are the workflow features in Redux?

- **Predictable state updates** (via pure reducers).
- **Centralized debugging** (Redux DevTools).
- **Time travel debugging** (can replay actions).
- **Middleware support** (logging, async calls, side effects).

---

### What are Redux forms?

Redux Forms (or `redux-form`) is a library that helps manage **form state** (input values, validation, submission) inside Redux store. (Though now, libraries like **Formik** and **React Hook Form** are more common.)

---

### What do you understand about the Redux Saga?

Redux Saga is a **middleware library** for handling **side effects (async logic like API calls)** in Redux using **generator functions (`function*`)**.

- It listens to dispatched actions.
- Runs background tasks like API calls.
- Dispatches new actions with results.

---

### Name all Redux store methods.

(Answered in **Q10**: `getState`, `dispatch`, `subscribe`, `replaceReducer`).

---

### What does “store” mean in Redux?

The **store is the centralized container** that holds the complete application state, making it predictable and easier to debug.

---

## React Native – Others

### What is HOC in React Native?

- **HOC (Higher-Order Component)** is a function that takes a component as an argument and returns a new component with added functionality.
- It’s used for **reusability, code abstraction, and cross-cutting concerns** (like logging, authentication, theming).

Example:

```tsx
function withLogger(WrappedComponent) {
  return function (props) {
    console.log('Props: ', props);
    return <WrappedComponent {...props} />;
  };
}
```

---

### Explain timers in React Native.

- React Native supports JavaScript timers like `setTimeout`, `setInterval`, `setImmediate`, and `requestAnimationFrame`.
- They’re often used for **delays, animations, polling APIs**, etc.
- Under the hood, timers run on the **JS thread** and are mapped to native timers via the bridge.

---

### What is meant by refs in React Native?

- **Refs** provide a way to access **DOM nodes or React elements directly**.
- In React Native, refs are often used to:
  - Focus text inputs
  - Trigger animations
  - Measure layout properties

Example:

```tsx
const inputRef = useRef(null);
<TextInput ref={inputRef} />
<Button title="Focus" onPress={() => inputRef.current.focus()} />
```

---

### What is a Gesture Responder?

- Gesture Responder System in React Native decides **how touches should be handled**.
- It helps manage **multiple gestures** (tap, swipe, scroll) and decide which component responds.
- Example: If you tap on a button inside a scroll view → RN decides whether the **scroll view** or the **button** should respond.

---

### What does an interaction manager do in React Native?

- **InteractionManager** allows you to **schedule long-running or expensive work** after animations and interactions have finished.
- Used for **performance optimization** (avoids blocking animations).

Example:

```tsx
InteractionManager.runAfterInteractions(() => {
  // Heavy task (e.g., API call, data processing)
});
```

---

### Difference between live reloading and hot reloading.

| Feature            | Live Reloading                    | Hot Reloading                         |
| ------------------ | --------------------------------- | ------------------------------------- |
| Behavior           | Reloads entire app on file change | Reloads only changed files/components |
| State Preservation | Loses app state                   | Preserves state (faster development)  |
| Usage              | Like refreshing the app           | Real-time UI updates                  |

_(Now replaced with **Fast Refresh**, which combines both.)_

---

### What is the use of arrow function in React Native?

- Arrow functions:
  - Provide **lexical `this` binding** (no need to manually bind `this`).
  - Cleaner syntax for callbacks.
- Example:

```tsx
onPress={() => this.handleClick()} // Arrow keeps correct 'this'
```

---

### Why are keys used in React Native?

- Keys help React efficiently **identify list items** and minimize re-renders.
- Without keys, React may **re-render unnecessarily**, hurting performance.

```tsx
{
  list.map(item => <Text key={item.id}>{item.name}</Text>);
}
```

---

### What is Fabric?

- **Fabric** is the **new React Native rendering engine**.
- Improvements:
  - Faster UI rendering (async rendering).
  - Better interoperability between native and JS.
  - Uses React’s **Concurrent Mode**.
- Part of the **new architecture** with TurboModules & JSI.

---

### How can you write tests in React Native?

- Common testing approaches:
  1. **Unit Testing** → Jest (logic & components).
  2. **Component Testing** → React Native Testing Library (render + interact).
  3. **End-to-End (E2E) Testing** → Detox or Appium.

Example (Jest + RTL):

```tsx
test('renders welcome message', () => {
  const {getByText} = render(<App />);
  expect(getByText('Welcome')).toBeTruthy();
});
```

---

### How do you persist data in React Native?

- Options:
  1. **AsyncStorage** → for small key-value storage.
  2. **Secure Storage (Keychain / Keystore)** → for sensitive data.
  3. **SQLite / WatermelonDB / Realm** → structured local database.
  4. **Redux-Persist** → persist Redux state to storage.

---
