import React from 'react'
import ReactDOM from 'react-dom'

export default class App extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div>Hello React</div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('hashtagMarqueeApp'))
