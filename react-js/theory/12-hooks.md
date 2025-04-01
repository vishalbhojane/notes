Hooks are functions that allow function components to use React state and lifecycle features without class components.

- Enable state and lifecycle features in function components
- Introduced to simplify component logic
- Can be used only at the top level of a function component

## Types of Hooks

| Category    | Hooks                | Function                                    |
| ----------- | -------------------- | ------------------------------------------- |
| State       | useState, useReducer | Manage component state                      |
| Context     | useContext           | Access data passed through React context    |
| Ref         | useRef               | Create mutable references to DOM elements   |
| Effect      | useEffect            | Perform side effects in function components |
| Performance | useMemo, useCallback | Optimize performance by memoizing values    |

## Additional Notes:

- Hooks must be called in the same order each time a component renders
- Custom hooks can be created to reuse stateful logic between components
- Hooks can't be used in class components
- Avoid calling hooks inside loops, conditions, or nested functions
