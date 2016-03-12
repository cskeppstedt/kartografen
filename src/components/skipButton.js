import React from 'react'
import './skipButton.scss'

export default function SkipButton ({ clickCallback }) {
  return (
    <button className='skipButton' onClick={clickCallback}>Skippa</button>
  )
}
