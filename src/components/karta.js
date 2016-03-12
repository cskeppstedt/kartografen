import React from 'react'
import './karta.scss'

export default function Karta ({ text, id }) {
  return (
    <div className={'karta ' + id}>
      {text}
    </div>
  )
}

Karta.propTypes = {
  text: React.PropTypes.string
}
