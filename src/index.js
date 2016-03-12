import React from 'react'
import ReactDOM from 'react-dom'
import Karta from './components/karta'
import Input from './components/input'
import './index.scss'

const MainView = React.createClass({
  getInitialState () {
    const countries = [
      { name: 'Sverige', id: 'sverige' },
      { name: 'Tyskland', id: 'tyskland' }
    ]
    const country = countries[0]
    const currentText = ''
    const showFeedback = false
    return { country, countries, currentText, showFeedback }
  },

  nextMap () {
    const newIndex = Math.floor(Math.random() * this.state.countries.length)
    const country = this.state.countries[newIndex]
    this.setState({ country })
  },

  handleOnChange (e) {
    const newText = e.target.value
    const currentCountry = this.state.country

    this.setState({currentText: newText})

    if (newText === currentCountry.name) {
      this.setState({currentText: ''})
      this.nextMap()
    }
  },

  render () {
    const currentCountry = this.state.country
    return (
      <div>
        <Karta
          text={this.state.currentText + ' ' + currentCountry.name}
          id={currentCountry.id}
        />
        <Input text={this.state.currentText} onChange={this.handleOnChange}/>
      </div>
    )
  }
})

ReactDOM.render(<MainView />, document.getElementById('kartografen'))
