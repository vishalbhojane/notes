First, install the necessary packages:

```bash
npm install @reduxjs/toolkit react-redux
```

Create a new file called `store.js` in your project's root directory:

```javascript
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // Add your reducers here
  },
});
```

Wrap your root component with the Redux Provider. In your `App.js` or `index.js` file:

```javascript
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import App from './App'; // Your main app component

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
```

Create your first slice. For example, let's create a `movieSlice.js`

```javascript
import {createSlice} from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Add your reducers here
  },
});

export const {actions, reducer} = movieSlice;
```

Add the slice to your store:

```javascript
import {configureStore} from '@reduxjs/toolkit';
import {reducer as movieReducer} from './movieSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});
```

Now you can use Redux in your components:

```javascript
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text} from 'react-native';
import {actions} from './movieSlice';

function MovieList() {
  const movies = useSelector((state) => state.movies.list);
  const dispatch = useDispatch();

  // Use dispatch to dispatch actions
  // Use movies to access the movie list from the state

  return (
    <View>
      <Text>Movie List</Text>
      {/* Render your movie list here */}
    </View>
  );
}

export default MovieList;
```
