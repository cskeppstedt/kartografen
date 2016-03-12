import React from 'react'
import './karta.scss'

export default function Karta ({ id }) {
  return (
    <div className={'karta ' + id}>
    
    </div>
  )
}

Karta.propTypes = {
  text: React.PropTypes.string
}
