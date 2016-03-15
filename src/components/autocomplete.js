import React from 'react'
import './autocomplete.scss'

export default function Autocomplete ({text, values, onClick}) {
  let matched = matchedValues(text, values)
  let styling = ''

  if (shouldBeHidden(text, matched)) {
    styling = 'hidden'
  }

  return (
    <div className={'autocomplete ' + styling}>
      <ul>
        { matched.map(function (value, index) {
          return <li key={index} onClick={onClick}>{value.name}</li>
        })
        }
      </ul>
    </div>
  )
}

function matchedValues (text, values) {
  return values.filter(c => c.name.startsWith(text))
}

function shouldBeHidden (text, matchedValues) {
  return text === '' && matchedValues.length > 0
}
