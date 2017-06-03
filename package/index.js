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

    const state = mapStateToProps(getGlobalState() || initialState)
    const dispatch = mapDispatchToProps ? mapDispatchToProps(setGlobalState) : {}

    return React.cloneElement(children, {
      ...state,
      ...dispatch,
      ...children.props
    })
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
        _.setState({
          ..._.state,
          ...state
        }, () => {
          _.ready = true
        })
      },
      getGlobalState () {
        return _.ready ? _.state : false
      }
    }
  }

  render () {
    return React.cloneElement(this.props.children, this.props.children.props || {})
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
