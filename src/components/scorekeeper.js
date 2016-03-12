import React from 'react'
import './scorekeeper.scss'

export default function Scorekeeper ({ score, skipped }) {
  return (
    <div className='scorekeeper'>{score} av {score + skipped}</div>
  )
}
