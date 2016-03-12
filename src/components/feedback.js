import React from 'react'
import './feedback.scss'

export default function Feedback ({ isDone, didSkip, country, score }) {
  let state
  if (isDone) {
    state = 'done'
  } else if (didSkip) {
    state = 'skipped'
  } else {
    state = 'ok'
  }

  return (
    <div className='feedback'>
      <div className={'feedback__icon ' + state} />
      <div className='feedback__text'>{text(isDone, score, country)}</div>
    </div>
  )
}

function text (isDone, {score, skipped}, {name}) {
  if (isDone) {
    return `Klart! ${score} / ${score + skipped}`
  }

  return name
}
