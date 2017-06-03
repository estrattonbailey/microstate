import React from 'react'
import { render } from 'react-dom'

import { Provider, connect } from '../package/dist/index.js'

const Component = connect(
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
)(props => {
  return (
    <div>
      <button onClick={e => props.greet('Eric')}>Greet</button>
      <div>{props.output}</div>
    </div>
  )
})

const App = props => (
  <div>
    <Provider>
      <div>
        <Component/>
      </div>
    </Provider>
  </div>
)

render(<App/>, document.getElementById('root'))

