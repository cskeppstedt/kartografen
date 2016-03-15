import React from 'react'
import './karta.scss'
import svg from './maps/vector-map-optimized.svg'

export default function Karta ({ id }) {
  return (
    <div className={'karta ' + id}>
      <div className='svg-container'>
        <div className='svg-wrapper'>
          <img className='svg-element' src={svg} />
        </div>
      </div>
    </div>
  )
}

Karta.propTypes = {
  text: React.PropTypes.string
}
