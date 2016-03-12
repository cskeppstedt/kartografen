import React from 'react'
import ReactDOM from 'react-dom'
import style from './index.css'

const MainView = React.createClass({
  render () {
    return <div className={style.component}>Hello world</div>
  }
})

ReactDOM.render(<MainView />, document.getElementById('kartografen'))
