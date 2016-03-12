import React from 'react'
import ReactDOM from 'react-dom'
import Karta from './components/karta'
import './index.scss'

const MainView = React.createClass({
  getInitialState () {
    const countries = [
      { name: 'Sverige', id: 'sverige' },
      { name: 'Tyskland', id: 'tyskland' }
    ]
    const country = countries[0]
    return { country, countries }
  },

  handleClick () {
    const newIndex = Math.floor(Math.random() * this.state.countries.length)
    const country = this.state.countries[newIndex]
    this.setState({ country })
  },

  render () {
    const currentCountry = this.state.country
    return (
      <div onClick={this.handleClick}>
        <Karta
          text={'test: ' + currentCountry.name}
          id={currentCountry.id}
        />
      </div>
    )
  }
})

ReactDOM.render(<MainView />, document.getElementById('kartografen'))
