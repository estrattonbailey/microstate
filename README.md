# microstate
Co-located, functional state management for React. `seState` syntatic sugar. **1.3kb**

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

## Note on Usage
This library is functional and has been used in production. However, the co-located nature of it means that the parent scope (and any other component subscribing to state that is external to itself) does not have access to the individual component state until **after the first render.** This is because the function hasn't fired (components are just functions) and so the co-located state hasn't been evaluated. The answer to this is to define all your state up front, at the top level, which this library doesn't do.

[@jxnblk](https://github.com/jxnblk) has been working on a similar idea with v2 of [refunk](https://github.com/jxnblk/refunk) and I highly recommend it.

Another similar option is [react-organism](https://github.com/RoyalIcing/react-organism) which I haven't used, but it looks neat!

* * *

**MIT License**
