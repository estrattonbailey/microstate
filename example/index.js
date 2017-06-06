import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'microstate'

import Input from './src/Input.js'
import Todos from './src/Todos.js'

const App = props => (
  <Provider>
    <div className="outer">
      <main>
        <Input/>
        <Todos/>
      </main>
    </div>
  </Provider>
)

render(<App/>, document.getElementById('root'))

