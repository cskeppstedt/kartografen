import React from 'react'
import { shallow } from 'enzyme'
import withAnimatedViewbox from './animated-viewbox'

const Dummy = React.createClass({
  render () {
    return <div className='dummy-component'>Dummy component</div>
  }
})

const ANIMATE_DURATION = 200

const WrappedDummy = withAnimatedViewbox(Dummy, ANIMATE_DURATION)

describe('animated-viewbox', () => {
  it('should render the wrapped component', () => {
    const wrapper = shallow(
      <WrappedDummy />
    )

    expect(wrapper.is(Dummy)).toBe(true)
  })

  it('should pass any prop down to the wrapped component', () => {
    const wrapper = shallow(
      <WrappedDummy foo='bar' somethingIsTrue />
    )

    expect(wrapper.prop('foo')).toEqual('bar')
    expect(wrapper.prop('somethingIsTrue')).toEqual(true)
  })

  it('should pass the first viewBox prop to the wrapped component without animating', () => {
    const viewBox = { x: 1, y: 2, width: 3, height: 4 }
    const wrapper = shallow(<WrappedDummy viewBox={viewBox}/>)
    const dummy = wrapper.find(Dummy)

    expect(dummy.prop('viewBox')).toEqual({ x: 1, y: 2, width: 3, height: 4 })
  })

  it('should change the viewBox prop over the given duration', (done) => {
    const initViewBox = { x: 1, y: 2, width: 3, height: 4 }
    const targetViewBox = { x: 10, y: 20, width: 30, height: 40 }

    const wrapper = shallow(<WrappedDummy viewBox={initViewBox}/>)
    wrapper.setProps({ viewBox: targetViewBox })

    setTimeout(function () {
      const dummy = wrapper.find(Dummy)
      const currentViewbox = dummy.prop('viewBox')
      expect(currentViewbox).not.toEqual(initViewBox)
      expect(currentViewbox).not.toEqual(targetViewBox)
    }, ANIMATE_DURATION / 2)

    setTimeout(() => {
      const dummy = wrapper.find(Dummy)
      const currentViewbox = dummy.prop('viewBox')
      expect(currentViewbox).toEqual(targetViewBox)
      done()
    }, ANIMATE_DURATION + 10) // add some buffer time to get the last callback(s)
  })
})
