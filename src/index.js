import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Karta from './components/karta'
import Input from './components/input'
import Feedback from './components/feedback'
import Scorekeeper from './components/scorekeeper'
import SkipButton from './components/skipButton'
import Autocomplete from './components/autocomplete'

import getCountries from './get-countries'
import countriesConfig from './config/countries.json'

import './index.scss'

function pickRandom (fromArray) {
  const index = Math.floor(Math.random() * fromArray.length)
  return fromArray[index]
}

const MainView = React.createClass({
  getInitialState () {
    const countries = getCountries(countriesConfig.countries)
    const country = pickRandom(countries)
    const currentText = ''
    const showFeedback = false
    const score = { score: 0, skipped: 0 }
    return { country, countries, currentText, showFeedback, score }
  },

  nextMap ({ didSkip }) {
    const isDone = (this.state.countries.length === 1)

    if (isDone) {
      this.setState({
        country: null,
        countries: [],
        showFeedback: true,
        isDone: true
      })
    } else {
      const country = this.state.country
      const countries = this.state.countries

      const newCountries = countries.filter((c) => c.id !== country.id)
      const newCountry = pickRandom(newCountries)

      this.setState({
        country: newCountry,
        countries: newCountries,
        oldCountry: country,
        didSkip: didSkip
      })
    }
  },

  changeMapIfTextIsCorrect (newText) {
    const currentCountry = this.state.country
    const score = this.state.score.score + 1
    const skipped = this.state.score.skipped

    this.setState({currentText: newText})

    if (newText === currentCountry.name) {
      this.setState({
        currentText: '',
        score: { score, skipped }
      })

      this.nextMap({ didSkip: false })
    }
  },

  handleOnChange (e) {
    const newText = e.target.value
    this.changeMapIfTextIsCorrect(newText)
  },

  handleOnClick (e) {
    const newText = e.target.textContent
    this.changeMapIfTextIsCorrect(newText)
  },

  skipMap () {
    const score = this.state.score.score
    const skipped = this.state.score.skipped + 1
    this.setState({
      currentText: '',
      score: { score, skipped }
    })
    this.nextMap({ didSkip: true })
  },
  render () {
    return (
      <div className='main'>
        {this.state.showFeedback
          ? this.renderFeedback()
          : this.renderCountry()
        }
      </div>
    )
  },

  renderFeedback () {
    return (
      <Feedback
        key={'feedback' + this.state.oldCountry.id}
        didSkip={this.state.didSkip}
        isDone={this.state.isDone}
        country={this.state.oldCountry}
        score={this.state.score}
      />
    )
  },

  renderCountry () {
    const currentCountry = this.state.country
    return (
      <div className='karta-wrapper'>
        <div className='score-wrapper'>
          <Scorekeeper {...this.state.score}/>
          <SkipButton clickCallback={this.skipMap} />
        </div>
        <Karta id={currentCountry.id} viewBox={currentCountry.viewBox} />
        <Autocomplete text={this.state.currentText} values={this.state.countries} onClick={this.handleOnClick} />
        <Input text={this.state.currentText} onChange={this.handleOnChange}/>
      </div>
    )
  }
})

ReactDOM.render(<MainView />, document.getElementById('kartografen')) /*eslint no-undef:0*/
