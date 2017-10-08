import React from 'react'
import ReactDOM from 'react-dom'
import css from './client.css'

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

class SimpleMarquee extends React.Component {
  constructor(props) {
    super()
    this.marqueeData = props.data
    this.marqueeEl = document.createElement('div')
    this.marqueeEl.classList.add('marqueeScroll')
    props.data.forEach((tweet) => {
        let t = document.createElement('div')
        t.innerText = tweet.text
        this.marqueeEl.appendChild(t)
    })
    console.log('this.marqueeEl', this.marqueeEl)
  }
  componentDidMount() {
    let marquee = document.getElementById('marquee')
    marquee.appendChild(this.marqueeEl)
    let cloned = this.marqueeEl.cloneNode(true)
    marquee.appendChild(cloned)

  }
  render() {
    return (
      <div id="marquee"></div>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {}
    this.state.marquee = null
  }
  searchHashtag(hashtag) {
    let localUrl = "http://localhost:5000/search/" + hashtag
    return new Promise((resolve, reject) => {
      fetch(localUrl).then(resp => resp.json()).then((data) => {
        console.log('here be data', data)
        resolve(data)
      }).catch(err => reject(err))
    })
  }
  renderMarquee(data) {
    this.setState({marquee: data}, () => {
      console.log(this.state.marquee)
    })
  }
  render() {
    return (
      <div>
        <h3>Hello React</h3>
        <SimpleInput
          searchHashtag={this.searchHashtag.bind(this)}
          renderMarquee={this.renderMarquee.bind(this)}
          />
        { this.state.marquee ? <SimpleMarquee data={this.state.marquee}/> : null}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('hashtagMarqueeApp'))
