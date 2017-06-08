import React from 'react'
import PropTypes from 'prop-types'

class LocalProvider extends React.Component {
  static displayName = 'LocalProvider'

  static contextTypes = {
    setGlobalState: PropTypes.func,
    getGlobalState: PropTypes.func,
    getInitialGlobalState: PropTypes.func
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
    const { getGlobalState, setGlobalState, getInitialGlobalState } = this.context

    const _state = getGlobalState() || initialState || {}
    const state = mapStateToProps ? mapStateToProps(_state) : _state
    const dispatch = mapDispatchToProps ? mapDispatchToProps(setGlobalState, _state || {}, getInitialGlobalState()) : {}

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
    getGlobalState: PropTypes.func,
    getInitialGlobalState: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {}

    this.ready = false
    this.initial = {}
  }

  getChildContext () {
    const _ = this

    return {
      setGlobalState (state) {
        state && _.setState(state, () => {
          if (!_.ready) {
            _.initial = _.state
            _.ready = true
          }
        })
      },
      getGlobalState () {
        return _.ready ? _.state : false
      },
      getInitialGlobalState () {
        return _.initial
      }
    }
  }

  render () {
    return React.Children.only(this.props.children)
  }
}

export const connect = (initialState, mapStateToProps, mapDispatchToProps) => {
  return Comp => props => (
    <LocalProvider
      initialState={initialState}
      mapStateToProps={mapStateToProps}
      mapDispatchToProps={mapDispatchToProps}>
      <Comp {...props}/>
    </LocalProvider>
  )
}
