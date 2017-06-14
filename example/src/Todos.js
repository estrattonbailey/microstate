import React from 'react'
import { connect } from 'microstate'

export default connect(
  null,
  state => ({
    todos: state.todos
  })
)(props => {
  console.log(props.todos)
  return (
    <div className="todos">
      <ul>
        {props.todos.map(todo => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </div>
  )
})
