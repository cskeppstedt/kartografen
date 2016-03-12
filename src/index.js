import React from 'react'
import ReactDOM from 'react-dom'
import Karta from './components/karta'
import Input from './components/input'
import Feedback from './components/feedback'
import Scorekeeper from './components/scorekeeper'
import SkipButton from './components/skipButton'

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
    const feedbackClass = 'feedback entering'
    const score = { score: 0, skipped: 0 }
    return { country, countries, currentText, showFeedback, feedbackClass, score }
  },

  nextMap ({ didSkip }) {
    const cssClass = didSkip ? 'feedback skipped' : 'feedback'
    this.setState({ feedbackClass: cssClass + ' entering' })
    this.setState({ showFeedback: true })

    setTimeout(() => {
      this.setState({ feedbackClass: cssClass })
    }, 0)

    setTimeout(() => {
      this.setState({ feedbackClass: 'exiting ' + cssClass })
      setTimeout(() => {
        this.setState({ showFeedback: false })
      }, 2000)
    }, 2000)

    const newIndex = Math.floor(Math.random() * this.state.countries.length)
    const country = this.state.countries[newIndex]
    this.setState({ country })
  },

  handleOnChange (e) {
    const newText = e.target.value
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
    const currentCountry = this.state.country
    return (

      <div className='main'>
      {this.state.showFeedback ? <Feedback cssClass={this.state.feedbackClass}/> : (
        <div>
          <Scorekeeper {...this.state.score}/>
          <SkipButton clickCallback={this.skipMap} />
          <Karta id={currentCountry.id} />
          <Input text={this.state.currentText} onChange={this.handleOnChange}/>
        </div>
        )}

      </div>
    )
  }
})

ReactDOM.render(<MainView />, document.getElementById('kartografen'))
