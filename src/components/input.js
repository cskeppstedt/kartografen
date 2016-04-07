import React from 'react'
import './input.scss'

export default function Input ({ text, onChange }) {
  return (
    <div className='input'>
      <input type='text' value={text} onChange={onChange} autoFocus />
    </div>
  )
}
