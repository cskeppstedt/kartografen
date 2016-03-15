import React from 'react'
import './autocomplete.scss'

export default function Autocomplete ({text, values}) {
  let matched = matchedValues(text, values)
  let styling = ''

  if (text === '' && matched.length > 0) {
    styling = 'hidden'
  }

  return (
    <div className={'autocomplete ' + styling}>
      <ul>
        { matched.map(function (value, index) {
          return <li key={index}>{value.name}</li>
        })
        }
      </ul>
    </div>
  )
}

function matchedValues (text, values) {
  return values.filter(c => c.name.startsWith(text))
}
