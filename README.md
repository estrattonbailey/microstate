# microstate
Co-located and composable state management for React and React-like libraries.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Usage
`microstate` has essentially the same API as Redux. First, wrap the part of your app you want to be stateful with a `Provider`. There's no need to define reducers or actions: that's all handled at the component level.
```javascript
// App.js
import { Provider } from 'microstate'

export default props => (
  <div>
    <Provider>
      <h1>My App</h1>
    </Provider>
  </div>
)

// index.js
render(<App/>, root)
```

Next, hook up a child component to state using `connect()`:
```javascript
// Component.js
import { connect } from 'microstate'

export default connect(
  {
    message: 'Hello!'
  },
  state => ({
    output: state.message
  }),
  dispatch => ({
    greet: name => dispatch({
      message: `Hello ${name}!`
    })
  })
)(props => (
  <div>
    <button onClick={e => props.greet('Eric')}>Greet</button>
    <div>{props.output}</div>
  </div>
))

// App.js
import { Provider } from 'microstate'
import Component from './Component.js'

export default props => (
  <div>
    <Provider>
      <Component/>
    </Provider>
  </div>
)

// index.js
render(<App/>, root)
```

## Example
To run the example, clone this repo, then:
```bash
# move into example dir
cd srraf/example
# install deps
npm i
# compile JS
npm run js:build # or js:watch
# serve index.html and update with changes
live-server 
```

MIT License
