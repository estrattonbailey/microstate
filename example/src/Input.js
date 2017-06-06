import React from 'react'
import { connect } from 'microstate'

export default connect(
  {
    todos: [],
    activeInputValue: ''
  },
  state => ({
    val: state.activeInputValue
  }),
  (dispatch, state) => ({
    update: val => dispatch({
      activeInputValue: val
    }),
    add: todo => dispatch({
      todos: [todo, ...state.todos],
      val: '',
      test: 'Hello world'
    })
  })
)(({ val, update, add }) => {
  return (
    <form onSubmit={e => {
      e.preventDefault()
      add(val)
    }}>
      <input value={val} onChange={e => update(e.target.value)}/>
    </form>
  )
})
