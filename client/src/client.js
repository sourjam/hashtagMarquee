import React from 'react'
import ReactDOM from 'react-dom'

class SimpleInput extends React.Component {
  constructor(props) {
    super()
    this.state = {}
    this.state.userInput = 'Enter hashtag'
  }
  updateInput(event) {
    this.setState({userInput: event.target.value})
  }
  render() {
    return (
      <input onChange={this.updateInput.bind(this)} type="text" value={this.state.userInput}></input>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div>
        <h3>Hello React</h3>
        <SimpleInput />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('hashtagMarqueeApp'))
