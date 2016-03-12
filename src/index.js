import React from 'react'
import ReactDOM from 'react-dom'
import Karta from './components/karta'
import Input from './components/input'
import Feedback from './components/feedback'
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
    return { country, countries, currentText, showFeedback, feedbackClass }
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
      this.setState({
        currentText: '',
        showFeedback: true
      })

      setTimeout(() => {
        this.setState({ feedbackClass: 'feedback' })
      }, 0)

      setTimeout(() => {
        this.setState({ feedbackClass: 'feedback exiting' })
        setTimeout(() => {
          this.setState({ showFeedback: false, feedbackClass: 'feedback entering' })
        }, 2000)
      }, 2000)

      this.nextMap()
    }
  },

  render () {
    const currentCountry = this.state.country
    return (
      <div className='main'>
      {this.state.showFeedback ? <Feedback cssClass={this.state.feedbackClass}/> : (
        <div>
          <Karta id={currentCountry.id} />
          <Input text={this.state.currentText} onChange={this.handleOnChange}/>
        </div>
        )}

      </div>
    )
  }
})

ReactDOM.render(<MainView />, document.getElementById('kartografen'))
