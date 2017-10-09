import React from 'react';

class SimpleInput extends React.Component {
  constructor(props) {
    super()
    this.state = {}
    this.state.userInput = ''
    this.state.searching = false
    this.searchHashtag = props.searchHashtag
    this.renderMarquee = props.renderMarquee
  }
  updateInput(event) {
    this.setState({userInput: event.target.value})
  }
  runSearch() {
    this.searchHashtag(this.state.userInput).then((result) => {
      if (result.error) {
        let marquee = [{text: 'No tweets found for: ' + this.state.userInput}]
      } else {
        console.log('time to render', result)
        this.renderMarquee(result)
      }
    })
  }
  render() {
    return (
      <div>
        <input onChange={this.updateInput.bind(this)}
          placeholder="Enter hashtag"
          type="text"
          value={this.state.userInput}></input>
        <button onClick={this.runSearch.bind(this)}>Search</button>
      </div>
    )
  }
}
