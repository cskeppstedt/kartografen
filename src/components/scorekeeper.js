import React from 'react'

export default function Scorekeeper ({ score, skipped }) {
  return (
    <div>{score} av {score + skipped}</div>
  )
}
