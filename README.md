# microstate
Co-located and composable state management for React.

`microstate` is a tiny abstraction on top of React's built-in `setState`, where each *microstate* you create has access to the state properties of every other *microstate* within the same parent scope. This allows you to retain the simplicity of stateful components with the added benefit of being able to communicate between them, without having to reach for something like Redux or MobX.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Usage
The `microstate` API is very simple and looks similar to Redux. 

### Wrap the part of your app you want to be stateful with a `Provider`.
This could be at a top level, or for just a small part of the application. There's no need to define reducers or actions.
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

### Create stateful components using `connect()`
Connect accepts three parameters *a la* `connect(initialState, mapStateToProps, mapDispatchToProps)`, and returns a function that accepts a component.
```javascript
// Component.js
import { connect } from 'microstate'

const initialState = {
  message: 'Hello!'
}

const mapStateToProps = state => {
  return {
    output: state.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    greet: name => dispatch({
      message: `Hello ${name}!`
    })
  }
}

const Component = props => (
  <div>
    <button onClick={e => props.greet('Eric')}>Greet</button>
    <div>{props.output}</div>
  </div>
)

export default connect(
  initialState,
  mapStateToProps,
  mapDispatchToProps
)(Component)

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
