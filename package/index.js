import React from 'react'
import PropTypes from 'prop-types'

class LocalProvider extends React.Component {
  static displayName = 'LocalProvider'

  static contextTypes = {
    setGlobalState: PropTypes.func,
    getGlobalState: PropTypes.func
  }

  constructor (props, context) {
    super(props, context)

    if (!context.setGlobalState) throw new Error(
      `connect(${this.props.children.displayName}) component has been rendered outside Provider context.`
    )
  }

  componentWillMount () {
    this.context.setGlobalState(this.props.initialState)
  }

  render() {
    const { initialState, mapStateToProps, mapDispatchToProps, children } = this.props
    const { getGlobalState, setGlobalState } = this.context

    const _state = getGlobalState() || initialState || {}
    const state = mapStateToProps ? mapStateToProps(_state) : _state
    const dispatch = mapDispatchToProps ? mapDispatchToProps(setGlobalState, _state || {}) : {}

    const props = {
      ...state,
      ...dispatch,
      ...children.props
    }

    return typeof children === 'function' ? (
      children(props)
    ) : (
      React.cloneElement(children, props)
    )
  }
}

export class Provider extends React.Component {
  static displayName = 'Provider'

  static childContextTypes = {
    setGlobalState: PropTypes.func,
    getGlobalState: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {}

    this.ready = false
  }

  getChildContext () {
    const _ = this

    return {
      setGlobalState (state) {
        state && _.setState(state, () => {
          _.ready = true
        })
      },
      getGlobalState () {
        return _.ready ? _.state : false
      }
    }
  }

  render () {
    const { children } = this.props
    const props = {
      state: this.state
    }

    return typeof children === 'function' ? (
      children(props)
    ) : (
      React.Children.only(children)
    )
  }
}

export const connect = (initialState, mapStateToProps, mapDispatchToProps) => {
  return Comp => props => (
    <LocalProvider
      initialState={initialState}
      mapStateToProps={mapStateToProps}
      mapDispatchToProps={mapDispatchToProps}>
      <Comp/>
    </LocalProvider>
  )
}
