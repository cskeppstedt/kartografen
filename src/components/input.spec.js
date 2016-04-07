import React from 'react'
import Input from './input'
import { shallow } from 'enzyme'

describe('input', () => {
  it('should be a div', () => {
    const wrapper = shallow(<Input />)
    expect(wrapper.type()).toEqual('div')
  })

  it('should have correct class names', () => {
    const wrapper = shallow(<Input />)
    expect(wrapper.hasClass('input')).toBe(true)
  })

  it('should render an actual input', () => {
    const wrapper = shallow(<Input />)
    expect(wrapper.find('input').length).toEqual(1)
  })

  it('should should have a text input', () => {
    const wrapper = shallow(<Input />)
    const input = wrapper.find('input')
    expect(input.prop('type')).toEqual('text')
  })

  it('should render the given text prop as input value', () => {
    const wrapper = shallow(<Input text='Fantasifullt' />)
    const input = wrapper.find('input')
    expect(input.prop('value')).toEqual('Fantasifullt')
  })

  it('should call the onChange function when value changes', () => {
    // given
    const callback = sinon.spy()
    const wrapper = shallow(<Input onChange={callback} />)

    // when
    wrapper.find('input').simulate('change')

    // then
    sinon.assert.calledOnce(callback)

    // let wasCalled = false
    // const callback = function () { wasCalled = true }
    // expect(callback.called).toEqual(true)
  })

  it('should have autoFocus', () => {
    const wrapper = shallow(<Input />)
    const input = wrapper.find('input')
    expect(input.prop('autoFocus')).toEqual(true)
  })
})
