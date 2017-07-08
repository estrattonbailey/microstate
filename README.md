# microstate
Co-located, functional state management for React. `seState` syntatic sugar.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Usage
Wrap your application with the `Provider`.
```javascript
import { Provider } from 'microstate'

const App = props => (
  <Provider>
    <h1>My App</h1>
  </Provider>
)

render(<App/>, root)
```

Connect your component to the provider state using `connect`. The function signature for connect looks like this:
```
connect(mapStateToProps[, mapDispatchToProps, initialState])(MyComp)
```

```javascript
import { connect } from 'microstate'

const initialState = {
  count: 0
}

const mapStateToProps = state => ({
  count: state.count
})

const mapDispatchToProps = dispatch => ({
  inc: () => dispatch(state => {
    count: state.count + 1
  })
})

const Component = ({ inc, count }) => (
  <div>
    <button onClick={inc}>Increment</button>
    <span>{count}</span>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  initialState
)(Component)
```

Then render your component within the Provider context.
```javascript
import { Provider } from 'microstate'
import Component from './Component.js'

const App = props => (
  <Provider>
    <Component/>
  </Provider>
)

render(<App/>, root)
```

Note: the state is availabe at a component level and below during first render. However, since an initial render is required to evaluate the `connect` function, state will only be availabe at the application level *after* that first render.

## Subscribing to state
Subscribing to another component's state is easy. Let's pretend the below is a different component than the counter above.
```javascript
// Output.js
export default connect(
  state => ({
    count: state.count,
    text: state.text
  },
  null,
  {
    text: 'The count is'
  }
)(({ count, text }) => (
  <div>{text + ' ' + count}</div>
))
```

Then add it to the rendered `App` from above.
```javascript
import { Provider } from 'microstate'
import Component from './Component.js'
import Output from './Output.js'

export default props => (
  <Provider>
    <Component/>
    <Output/>
  </Provider>
)

render(<App/>, root)
```

MIT License
