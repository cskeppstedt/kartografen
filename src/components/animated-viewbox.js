import React, { PropTypes } from 'react'
import TWEEN from 'tween.js'

export default function (Component, ANIMATE_DURATION) {
  return React.createClass({
    propTypes: {
      viewBox: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number
      })
    },

    render () {
      return <Component {...this.props} {...this.state} />
    },

    componentWillReceiveProps (nextProps) {
      const newViewBox = nextProps.viewBox
      const oldViewBox = this.props.viewBox

      if (shouldAnimate(newViewBox, oldViewBox)) {
        this.startAnimation({ ...newViewBox }, { ...oldViewBox })
      }
    },

    startAnimation (newViewBox, oldViewBox) {
      const self = this
      new TWEEN.Tween(oldViewBox)
        .to(newViewBox, ANIMATE_DURATION)
        .onUpdate(function () {
          const newState = {
            viewBox: {
              x: this.x,
              y: this.y,
              width: this.width,
              height: this.height
            }
          }

          self.setState(newState)
        })
        .start()

      self.setState({
        viewBox: oldViewBox
      })

      requestAnimationFrame(tick) /*eslint no-undef:0*/
      function tick () {
        TWEEN.update()
        requestAnimationFrame(tick) /*eslint no-undef:0*/
      }
    }
  })
}

function shouldAnimate (newViewBox, oldViewBox) {
  if (!newViewBox || !oldViewBox) {
    return false
  }

  const hasChangedProperty = ['x', 'y', 'width', 'height'].find((name) => (
    newViewBox[name] !== oldViewBox[name]
  ))

  return !!hasChangedProperty
}

